const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const User = require('../models/user');
const Follower = require('../models/follower');
const Message = require('../models/message');

let LATEST = 0;

function get_user_id(username) {
    return new Promise((resolve, reject) => {
        User.findOne({
            'username': username
        })
            .then(user => {
                resolve(user._id);
            })
            .catch(err => {
                console.log('err', err);
                reject();
            })
    });
}

function update_latest(value) {
    LATEST = value != -1 ? value : LATEST;
}

router.get("/latest", (req, res, next) => {
    res.status(200).json({
        "latest": LATEST
    })
})

router.post("/register", (req, res, next) => {
    update_latest(req.body.latest);
    let err = "";
    if (!req.body.username) {
        err = "You have to enter a username";
    } else if (!req.body.email || (!req.body.email.includes("@") && !req.body.email.includes("."))) {
        err = "You have to enter a valid email address";
    } else if (!req.body.password) {
        err = "You have to enter a password";
    } else if (get_user_id(req.body.username) != undefined) {
        err = "Username already taken";
    } else {
        bcrypt.hash(req.body.password, 10, (err, hash) => {
            if (err) {
                return res.status(500).json({
                    error: err
                })
            } else {
                const newUser = new User({
                    _id: new mongoose.Types.ObjectId(),
                    username: req.body.username,
                    email: req.body.email,
                    pw_hash: hash
                })
                newUser.save()
                    .then(result => {
                        console.log("added new user", result);
                        res.status(204);
                    })
                    .catch(err => res.status(500).json({
                        error: err
                    }));
            }
        });
    }
    if (err.length != 0) {
        res.status(400).json({
            "error_msg": err
        })
    }
})


// TODO: solve async
router.get("/msgs", (req, res, next) => {
    update_latest(req.body.latest);
    const number_messages = req.body.no;
    Message.find()
        .limit(number_messages)
        .sort({
            "pub_date": -1
        })
        .then(messagesResult => {
            let filtered_msgs = [];
            new Promise((resolve, reject) => {
                for (const message of messagesResult) {
                    User.findById(message.author_id)
                        .then(user => {
                            filtered_msg = {};
                            filtered_msg['content'] = message.text;
                            filtered_msg['pub_date'] = message.pub_date;
                            filtered_msg['user'] = user.username;
                            filtered_msgs.push(filtered_msg);
                            console.log(filtered_msgs);
                        })
                        .catch(err => {
                            console.log(err);
                            reject();
                        });
                }
                resolve();
            }).then(result => {
                console.log(filtered_msgs);
                res.status(200).json({ filtered_msgs });
            }
            )

            console.log(filtered_msgs);
            res.status(200).json({ filtered_msgs });
        })
        .catch(err => {
            res.status(500).json({ error: err })
        });
})

router.get("/msgs/:username", async (req, res, next) => {
    update_latest(req.body.latest);
    const number_messages = req.body.no;

    const user_id = await get_user_id(req.params.username);

    if (!user_id) return res.status(404).json({ "err": "User not found" });

    Message.find({
        'author_id': user_id
    })
        .limit(number_messages)
        .sort({
            "pub_date": -1
        })
        .then(userMessages => {
            console.log('userMessages', userMessages)
            var filtered_msgs = [];

            userMessages.forEach(message => {
                console.log('message', message)
                filtered_msg = {};
                filtered_msg['content'] = message.text;
                filtered_msg['pub_date'] = message.pub_date;
                filtered_msg['user'] = req.params.username;
                filtered_msgs.push(filtered_msg);
            })
            res.status(200).json({ filtered_msgs });

        })
        .catch(err => {
            res.status(500).json({ error: err })
        })
})

router.post("/msgs/:username", async (req, res, next) => {
    update_latest(req.body.latest);

    const user_id = await get_user_id(req.params.username);
    if (!user_id) return res.status(404).json({ "err": "User not found" });

    const newMessage = new Message({
        message_id: new mongoose.Types.ObjectId(),
        author_id: user_id,
        text: req.body.text,
        pub_date: new Date(),
        flagged: req.body.flagged
    });
    newMessage
        .save()
        .then(result => {
            res.status(204).json(result);
        })
        .catch(err => res.status(500).json(err));
})

router.get("/fllws/:username", async (req, res, next) => {
    update_latest(req.body.latest);
    const user_id = await get_user_id(req.params.username);
    if (!user_id) return res.status(404).json({ "err": "User not found" });

    Follower.find({
        "who_id": user_id
    })
        .then(followers => {
            const follows = [];
            followers.map(follower => {
                follows.push(follower.whom_id);
            })
            console.log('follows', follows);
            res.status(200).json({
                "follows": follows
            })
        })
        .catch(err => res.status(500).json(err));
})

router.post("/fllws/:username", async (req, res, next) => {
    update_latest(req.body.latest);

    const user_id = await get_user_id(req.params.username);
    if (!user_id) return res.status(404).json({ "err": "User not found" });

    if (req.body.keys == "follow") {
        to_follow_user_id = req.body.follow;
        if (!to_follow_user_id) {
            res.status(404).json({
                "message": "no username to follow found"
            })
        } else {
            const newFollower = new Follower({
                who_id: user_id,
                whom_id: to_follow_user_id
            });
            newFollower.save()
                .then(result => {
                    res.status(204).json(result);
                })
                .catch(err => console.log(err));
        }

    } else if (req.body.keys == "unfollow") {
        to_unfollow_user_id = req.body.unfollow;
        if (!to_unfollow_user_id) {
            res.status(404).json({
                "message": "no user to unfollow found"
            })
        }

        Follower.findOneAndDelete({
            "who_id": user_id,
            "whom_id": to_unfollow_user_id
        }).then(result => {
            res.status(204).json(result);
        })

    }

})

module.exports = router;