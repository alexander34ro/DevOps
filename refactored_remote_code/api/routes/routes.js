const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();

const User = require('../models/user');
const Follower = require('../models/follower');
const Message = require('../models/message');

app.use(cors());

router.get('/', (req, res, next) => {
    res.status(200).json({'response': '/ works'});
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
        console.log(err);
        res.status(500).json({error: err})
    } )
})

router.get('/username/follow', (req, res, next) => {
    res.status(200).json({'response': '/username/follow works'});
})

router.get('/username/unfollow', (req, res, next) => {
    res.status(200).json({'response': '/username/unfollow works'});
})

router.post('/username/add_message', (req, res, next) => {
    res.status(200).json({'response': '/username/add_message works'});
})

router.get('/login', (req, res, next) => {
    res.status(200).json({'response': '/login works'});
})

router.post('/login', (req, res, next) => {
    const newUser = new User({
        _id: new mongoose.Types.ObjectId(),
        username: req.body.username,
        email: req.body.email,
        pw_hash: req.body.password
    });
    newUser.save()
    .then(result => console.log(result))
    .catch(err => console.log(err));

    res.status(200).json(
        {
        'result': 'success',
        'body': req.body
        }
    );
})

router.get('/register', (req, res, next) => {
    res.status(200).json({'response': '/register works'});
})

router.post('/register', (req, res, next) => {
    res.status(200).json({'response': '/register works'});
})

router.get('/logout', (req, res, next) => {
    res.status(200).json({'response': '/logout works'});
})

module.exports = router;