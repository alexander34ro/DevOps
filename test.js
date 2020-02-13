const test = require("ava");
const request = require("supertest");
const { MongoMemoryServer } = require("mongodb-memory-server");
const mongoose = require("mongoose");

const app = require('./index');
const User = require('./models/user');
const Message = require('./models/message');
const Follower = require('./models/follower');

test("register", t => {
    let rv = null;
    t.pass();
});

test("login_logout", t => {
  let rv = null;
  t.pass();
});

test("message_recording", t => {
  let rv = null;
  t.pass();
});

test("timelines", t => {
  let rv = null;
  t.pass();
});
