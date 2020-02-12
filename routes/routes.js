const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();

const User = require('../models/user');
const Follower = require('../models/follower');
const Message = require('../models/message');

app.use(cors());

let currentUser = {
    user_id: null,
    username: null,
    email: null,
    pw_hash: null
};

router.get('/', (req, res, next) => {
    Message.find().exec().
    then(result=>{  res.status(200).json({result});})
    .catch(err => {
        res.status(500).json({error: err})
    });
})

router.get('/public', (req, res, next) => {
    res.status(200).json({'response': '/public works'});
})

router.get('/:username', (req, res, next) => {
    const username = req.params.username;
    User.findOne({
        'username': username
    })
    .exec()
    .then(result => {
        res.status(200).json(result);
    })
    .catch(err => {
        res.status(500).json({error: err})
    });
})

router.get('/:username/follow', (req, res, next) => {
    const usernameToFollow = req.params.username;
    User.findOne({
        'username': usernameToFollow
    })
    .exec()
    .then(result => {
        if(result == null){
            res.status(404).json({"message": "username to follow non existent"})
        } else {
            const newFollower = new Follower({
                who_id: currentUser.username,
                whom_id: usernameToFollow
            });
            newFollower.save()
            .then(result => {
                res.status(200).json(
                    {
                    'result': result,
                    'body': req.body
                    }
                );
            })
            .catch(err => console.log(err));
        }
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({error: err})
    } )
})

router.get('/:username/unfollow', (req, res, next) => {
    const usernameToFollow = req.params.username;
    User.findOne({
        'username': usernameToFollow
    })
    .exec()
    .then(result => {
        if(result == null){
            res.status(404).json({"message": "username to unfollow non existent"})
        } else {
            Follower.findOneAndDelete({
                who_id: currentUser.username,
                whom_id: usernameToFollow
            })
            .then(result => {
                res.status(200).json(
                    {
                    'result': result,
                    'body': req.body
                    }
                );
            })
            .catch(err => console.log(err));
        }
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({error: err})
    } )
})

router.post('/add_message', (req, res, next) => {
    const newMessage = new Message({
        message_id: new mongoose.Types.ObjectId(),
        author_id: currentUser.user_id,
        text: req.body.text,
        pub_date: new Date(),
        flagged: req.body.flagged
    });
    newMessage.save()
    .then(result => {
        res.status(200).json(
            {
            'result': result,
            'body': req.body
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
        if(result == null){
            currentUser = null;
            res.status(404).json({"message": "NOT VALID login credentials"})
        } else {
            currentUser = result;
            res.status(200).json({"message": "VALID login credentials"});
        }
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({error: err})
    } )
})

router.post('/register', (req, res, next) => {
    const newUser = new User({
        _id: new mongoose.Types.ObjectId(),
        username: req.body.username,
        email: req.body.email,
        pw_hash: req.body.password
    });
    newUser.save()
    .then(result => {
        res.status(200).json(
            {
            'result': result,
            'body': req.body
            }
        );
    })
    .catch(err => console.log(err));
})

router.get('/logout', (req, res, next) => {
    currentUser = null;
    res.status(200).json({'response': 'user logged out'});
})

module.exports = router;