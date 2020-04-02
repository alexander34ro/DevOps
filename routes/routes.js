const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const User = require("../models/user");
const Follower = require("../models/follower");
const Message = require("../models/message");

let LATEST = 0;
const LOGS = true;

function get_user_id(username) {
  return new Promise((resolve, reject) => {
    User.findOne({
      username: username
    })
      .then(user => {
        if (user != null) {
          resolve(user._id);
        } else {
          resolve(undefined);
        }
      })
      .catch(err => {
        console.log("err", err);
        reject();
      });
  });
}

function log_request(r) {
  if (LOGS) {
    console.log(
      "Request:",
      [
        { params: r.params },
        { query: r.query },
        { body: r.body }
      ]
    );
  }
}

function update_latest(value) {
  LATEST = value != -1 && value != undefined ? value : LATEST;
  console.log("received value:", value, "- latest:", LATEST);
}

router.get("/latest", (req, res, next) => {
  return res.status(200).json({
    latest: LATEST
  });
});

router.post("/register", (req, res, next) => {
  log_request(req);
  update_latest(req.query.latest);
  get_user_id(req.body.username)
    .then(user_id => {
      let err = "";
      if (!req.body.username) {
        err = "You have to enter a username";
      } else if (
        !req.body.email ||
        (!req.body.email.includes("@") && !req.body.email.includes("."))
      ) {
        err = "You have to enter a valid email address";
      } else if (!req.body.pwd) {
        err = "You have to enter a pwd";
      } else if (user_id != undefined) {
        err = "Username already taken";
      } else {
        bcrypt.hash(req.body.pwd, 10, (err, hash) => {
          if (err) {
            return res.status(500).json({
              error: err
            });
          } else {
            const newUser = new User({
              _id: new mongoose.Types.ObjectId(),
              username: req.body.username,
              email: req.body.email,
              pw_hash: hash
            });
            newUser
              .save()
              .then(result => {
                console.log("added new user", result);
                return res.status(204).json({
                  message: "successful"
                });
              })
              .catch(err =>
                res.status(500).json({
                  error: err
                })
              );
          }
        });
      }
      if (err.length != 0) {
        return res.status(400).json({
          error_msg: err
        });
      }
    })
    .catch(err => console.log(err));
});

// TODO: solve async
router.get("/msgs", (req, res, next) => {

  log_request(req);
  update_latest(req.query.latest);
  const number_messages = req.query.no ? Number(req.query.no) : 0;
  console.log(number_messages);

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
              "messagesResult": messages
            });
      })
      .catch(err => {
          res.status(500).json({ error: err })
      });
});

router.get("/msgs/:username", async (req, res, next) => {
  log_request(req);
  update_latest(req.query.latest);
  const number_messages = req.query.no ? Number(req.query.no) : 0;

  const user_id = await get_user_id(req.params.username);

  if (!user_id) return res.status(404).json({ err: "User not found" });

  Message.find({
    author_id: user_id
  })
    .limit(number_messages)
    .sort({
      pub_date: -1
    })
    .then(userMessages => {
      console.log("userMessages", userMessages);
      var filtered_msgs = [];

      userMessages.forEach(message => {
        console.log("message", message);
        filtered_msg = {};
        filtered_msg["content"] = message.text;
        filtered_msg["pub_date"] = message.pub_date;
        filtered_msg["user"] = req.params.username;
        filtered_msgs.push(filtered_msg);
      });
      return res.status(200).json({ filtered_msgs });
    })
    .catch(err => {
      return res.status(500).json({ error: err });
    });
});

router.post("/msgs/:username", async (req, res, next) => {
  log_request(req);
  update_latest(req.query.latest);

  const user_id = await get_user_id(req.params.username);
  if (!user_id) return res.status(404).json({ err: "User not found" });

  const newMessage = new Message({
    message_id: new mongoose.Types.ObjectId(),
    author_id: user_id,
    author_username: req.params.username,
    text: req.body.content,
    pub_date: new Date(),
    flagged: false
  });
  newMessage
    .save()
    .then(result => {
      return res.status(204).json(result);
    })
    .catch(err => res.status(500).json(err));
});

router.get("/fllws/:username", async (req, res, next) => {
  log_request(req);
  update_latest(req.query.latest);
  const user_id = await get_user_id(req.params.username);
  if (!user_id) return res.status(404).json({ err: "User not found" });

  Follower.find({
    who_id: user_id
  })
    .then(followers => {
      const follows = [];
      followers.map(follower => {
        follows.push(follower.whom_id);
      });
      console.log("follows", follows);
      return res.status(200).json({
        follows: follows
      });
    })
    .catch(err => res.status(500).json(err));
});

router.post("/fllws/:username", async (req, res, next) => {
  log_request(req);
  update_latest(req.query.latest);

  const user_id = await get_user_id(req.params.username);
  if (!user_id) return res.status(404).json({ err: "User not found" });

  if (req.body.follow) {
    const to_follow_user_id = await get_user_id(req.body.follow);
    console.log("FOLLOWER USER ID: " + user_id);
    console.log("TO FOLLOW USER ID: " + to_follow_user_id);
    if (!to_follow_user_id) {
      return res.status(404).json({
        message: "no username to follow found"
      });
    } else {
      const newFollower = new Follower({
        who_id: user_id,
        whom_id: to_follow_user_id
      });
      newFollower
        .save()
        .then(result => {
          return res.status(204).json(result);
        })
        .catch(err => console.log(err));
    }
  } else if (req.body.unfollow) {
    const to_unfollow_user_id = await get_user_id(req.body.unfollow);
    if (!to_unfollow_user_id) {
      return res.status(404).json({
        message: "no user to unfollow found"
      });
    }

    Follower.findOneAndDelete({
      who_id: user_id,
      whom_id: to_unfollow_user_id
    }).then(result => {
      return res.status(204).json(result);
    });
  } else return res.status(404).json({
    message: "No follow or unfollow"
  })
});

module.exports = router;
