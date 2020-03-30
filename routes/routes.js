const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const User = require('../models/user');
const Follower = require('../models/follower');
const Message = require('../models/message');

app.use(cors());

let currentUser = {
    _id: null,
    username: null,
    email: null,
    pw_hash: null
};

router.get('/', (req, res, next) => {
    if (!currentUser._id) {
        // user is not logged -> redirect to public
        res.redirect('/public');
    } else {
        Follower.findOne({
            'who_id': currentUser._id
        })
            .then(followerUser => {
                if(followerUser == null){
                    //display own messages
                    Message.find({
                        "author_id": currentUser._id
                    })
                    .then(messages => {
                        res.status(200).json({
                            'result': messages
                        });
                    })
                } else {
                    // display own+follower messages
                    Promise.all([
                        Message.find({
                            'author_id': currentUser._id
                        }),
                        Message.find({
                            'author_id': followerUser.whom_id
                        })
                    ])
                        .then(messages => {
                            res.status(200).json({
                                'result': Array.prototype.concat.apply([], messages)
                            });
                        })
                        .catch(err => {
                            res.status(500).json({
                                'err': err
                            })
                        })
                }

            })
            .catch(err => {
                res.status(500).json({ 'err': err });
            })
    }
})

router.get('/public', async (req, res, next) => {

    const pageSize = 10;

    const messageCount = await Message.countDocuments();
    const pageCount = Math.ceil(messageCount / pageSize);

    let page = parseInt(req.query.p);
    if (!page) { page = 1;}
    if (page > pageCount) {
        page = pageCount
    }

    Message.find()
    .sort({ pub_date : -1 })
    .skip(pageSize*(page-1))
    .limit(pageSize)
        .then(messages => {

            res.status(200).json({
                "page": page,
                "pageCount": pageCount,
                "messages": messages
              });
        })
        .catch(err => {
            res.status(500).json({ error: err })
        });
})

router.get('/:username', (req, res, next) => {
    const username = req.params.username;
    User.findOne({
        'username': username
    })
    .then(user => {
        Message.find({
            'author_id': user._id
        })
        .sort({"pub_date":-1})
        .then(userMessages => {
            res.status(200).json({
                'response': userMessages
            })
        })
        .catch(err => {
            res.status(500).json({error: err})
        })
    })
    .catch(err => {
        res.status(500).json({ error: err })
    });
})

router.get('/:username/follow', (req, res, next) => {
    const usernameToFollow = req.params.username;
    User.findOne({
        'username': usernameToFollow
    })
        .exec()
        .then(user => {
            if (user == null) {
                res.status(404).json({ "message": "username to follow non existent" })
            } else {
                const newFollower = new Follower({
                    who_id: currentUser._id,
                    whom_id: user._id
                });
                newFollower.save()
                    .then(result => {
                        res.status(200).json(
                            {
                                'result': result
                            }
                        );
                    })
                    .catch(err => console.log(err));
            }
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({ error: err })
        })
})

router.get('/:username/unfollow', (req, res, next) => {
    const usernameToFollow = req.params.username;
    User.findOne({
        'username': usernameToFollow
    })
        .exec()
        .then(user => {
            if (user == null) {
                res.status(404).json({ "message": "username to unfollow non existent" })
            } else {
                Follower.findOneAndDelete({
                    who_id: currentUser._id,
                    whom_id: user._id
                })
                    .then(result => {
                        res.status(200).json(
                            {
                                'result': result
                            }
                        );
                    })
                    .catch(err => console.log(err));
            }
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({ error: err })
        })
})

router.post('/add_message', (req, res, next) => {

    if(!currentUser._id) {
        res.status(401).json({
            "message": "Unauthorized. Please log in"
        })
    } else {
        const newMessage = new Message({
            message_id: new mongoose.Types.ObjectId(),
            author_id: currentUser._id,
            author_username: currentUser.username,
            text: req.body.text,
            pub_date: new Date(),
            flagged: req.body.flagged
        });
        newMessage.save()
            .then(result => {
                res.status(200).json(
                    {
                        'result': result
                    }
                );
            })
            .catch(err =>res.status(500).json({"err":err}));
    }
})

router.post('/login', (req, res, next) => {
    const username = req.body.username;
    const password = req.body.password;
    User.find({
        'username': username
    })
        .then(user => {
            if (user.length<1) {    
                res.status(401).json({ "message": "Auth failed" })
            } else {
                bcrypt.compare(password, user[0].pw_hash, (err, result) => {
                    if(err || !result){
                        return res.status(401).json({
                            "message": "Auth failed"
                        })
                    }
                    if(result){
                        // const token = jwt.sign({
                        //     username: user[0].username,
                        //     _id: user[0]._id
                        // }, "jwt_pw", {
                        //     expiresIn:"1h"
                        // })
                        currentUser = user[0];
                        return res.status(200).json({
                            message:"Auth successful"
                            // token: token
                        })
                    }
                })
            }
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({ error: err })
        })
})

router.post('/register', (req, res, next) => {
    User.find({
        'username': req.body.username
    })
    .then(user => {
        if(user.length>=1){
            return res.status(409).json({
                message: "username already exists"
            })
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
                        res.status(200).json(
                            {
                                'result': result
                            }
                        );
                    })
                    .catch(err => res.status(500).json({
                        error: err
                    }));
                }
            });
        }
    })
    

})

router.get('/logout', (req, res, next) => {
    currentUser = null;
    res.status(200).json({ 'response': 'user logged out' });
})

module.exports = router;