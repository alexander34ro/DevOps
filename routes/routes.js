const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();
const bcrypt = require('bcrypt');

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
    console.log('currentUser', currentUser);
    if (!currentUser._id) {
        // user is not logged -> redirect to public
        res.redirect('/public');
    } else {
        Follower.findOne({
            'who_id': currentUser._id
        })
            .then(followerUser => {
                Promise.all([
                    Message.findOne({
                        'author_id': currentUser._id
                    }),
                    Message.findOne({
                        'author_id': followerUser.whom_id
                    })
                ])
                    .then(messages => {
                        res.status(200).json({
                            'result': messages
                        });
                    })
                    .catch(err => {
                        res.status(500).json({
                            'err': err
                        })
                    })
            })
            .catch(err => {
                res.status(500).json({ 'err': err });
            })
    }
})

router.get('/public', (req, res, next) => {
    Message.find()
        .then(result => {
            res.status(200).json({ result });
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
    const newMessage = new Message({
        message_id: new mongoose.Types.ObjectId(),
        author_id: currentUser._id,
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
        .catch(err => console.log(err));
})

router.post('/login', (req, res, next) => {
    const username = req.body.username;
    const password = req.body.password;
    User.findOne({
        'username': username,
        'pw_hash': password
    })
        .exec()
        .then(result => {
            if (result == null) {
                currentUser = null;
                res.status(404).json({ "message": "NOT VALID login credentials" })
            } else {
                currentUser = result;
                res.status(200).json({ "message": "VALID login credentials" });
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