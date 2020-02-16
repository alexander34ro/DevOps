const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const User = require('../models/user');
const Follower = require('../models/follower');
const Message = require('../models/message');

let LATEST = 0;

function get_user_id(username){
    User.findOne({
        'username': username
    })
    .then(user => {
        return user._id
    })
    .catch(err => {
        console.log('err', err);
        return 0;
    })
}

function update_latest(value){
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
    if (!req.body.username){
        err = "You have to enter a username";
    } else if(!req.body.email || (!req.body.email.includes("@") && !req.body.email.includes("."))){
        err = "You have to enter a valid email address";
    } else if(!req.body.password){
        err = "You have to enter a password";
    } else if(get_user_id(req.body.username) != undefined){
        err = "Username already taken";
    } else {
        bcrypt.hash(req.body.password, 10, (err, hash) => {
            if(err){
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
    if(err.length != 0){
        res.status(400).json({
            "error_msg": err
        })
    }
})

router.get("/msgs", (req, res, next) => {
    update_latest(req.body.latest);
    const number_messages = req.body.no;
    Message.find()
    .limit(number_messages)
    .then(messagesResult => {
        let filtered_msgs = [];

        const promises = messagesResult.map(async message => {
            const user = await User.findById(message.author_id);
            return user;
        });

        const users = await Promise.all(promises);

        for(const message of messagesResult){
            User.findById(message.author_id)
            .then(user => {
                filtered_msg = {};
                filtered_msg['content'] = message.text;
                filtered_msg['pub_date'] = message.pub_date;
                filtered_msg['user'] = user.username;
                filtered_msgs.push(filtered_msg);
                return filtered_msgs;
            })
            .catch(err => console.log(err));
        }
        console.log(filtered_msgs);
        res.status(200).json({ filtered_msgs });
    })
    .catch(err => {
        res.status(500).json({ error: err })
    });
})

module.exports = router;