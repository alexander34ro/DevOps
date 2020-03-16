const test = require("ava");
const request = require("supertest");
const { MongoMemoryServer } = require("mongodb-memory-server");
const mongoose = require("mongoose");
const express = require("express");
const app = require("./index");
const User = require("./models/user");
const Message = require("./models/message");
const Follower = require("./models/follower");

// Start MongoDB instance
const mongod = new MongoMemoryServer();
const dbPassword = "nIfTcQjmAOFWH2kH";
// Create connection to Mongoose before tests are run
test.before(async () => {
  const uri = await mongod.getConnectionString();
  await mongoose.connect(
    `mongodb+srv://admin:${dbPassword}@cluster0-zb0x5.mongodb.net/test?retryWrites=true&w=majority`,
    { useMongoClient: true }
  );
  // await mongoose.connect(uri, {useMongoClient: true});
});

// Add dummy data to Mongoose before each test is run
test.beforeEach(async () => {
  await User.remove({}).exec();
  await Follower.remove({}).exec();
  await Message.remove({}).exec();
});
/*
test.afterEach.always(async () => {

  await User.remove({}).exec();
  await Follower.remove({}).exec();
  await Message.remove({}).exec();
}); */
test.after.always(async () => {
  mongoose.disconnect();
  mongod.stop();
});

test.serial("register", async t => {
  const rv = null;
  // const {app} = t.context;
  const mockUser = new User({
    _id: new mongoose.Types.ObjectId(),
    username: "testytest112",
    email: "testyregister@testoo.com",
    password: "testyPass",
    pw_hash: "notImportantForThisTest"
  }); // BAD CQ BUT REMEMBER TO EDIT THE REQUEST TOO!!!

  const res = await request(app)
    .post("/register")
    .send({
      email: "testyregister@testoo.com",
      username: "testytest112",
      password: "testyPass"
    })
    .set("Accept", "application/json");

  t.is(res.status, 200);

  // Verify that user is created in DB
  const newUser = await User.findOne({ email: mockUser.email });
  t.is(newUser.username, mockUser.username);
  const rem = await User.remove({ username: mockUser.username });
});

test.serial("login", async t => {
  const rv = null;
  const reg = await request(app)
    .post("/register")
    .send({
      email: "testy@testoo.com",
      username: "testyTest",
      password: "testyPass"
    })
    .set("Accept", "application/json");

  t.is(reg.status, 200);
  const log = await request(app)
    .post("/login")
    .send({
      password: "testyPass",
      username: "testyTest"
    })
    .set("Accept", "application/json");

  t.is(log.status, 200);

  const rem = await User.remove({ username: "testyTest" });
});

test("message_recording", async t => {
  const rv = null;

  const reg = await request(app)
    .post("/register")
    .send({
      email: "testy@testoo.com",
      username: "testyTest",
      password: "testyPass"
    })
    .set("Accept", "application/json");

  t.is(reg.status, 200);
  const log = await request(app)
    .post("/login")
    .send({
      password: "testyPass",
      username: "testyTest"
    })
    .set("Accept", "application/json");

  t.is(log.status, 200);
  const msg = await request(app)
    .post("/add_message")
    .send({
      text: "someTestyText",
      flagged: false
    })
    .set("Accept", "application/json");

  t.is(msg.status, 200);
});

test("timelines", async t => {
  // user 1, message 1
  const reg = await request(app)
    .post("/register")
    .send({
      email: "testy1@testoo.com",
      username: "testyTest",
      password: "testyPass"
    })
    .set("Accept", "application/json");

  t.is(reg.status, 200);
  const log = await request(app)
    .post("/login")
    .send({
      password: "testyPass",
      username: "testyTest"
    })
    .set("Accept", "application/json");

  t.is(log.status, 200);

  const msg = await request(app)
    .post("/add_message")
    .send({
      text: "someTestyText1",
      flagged: false
    })
    .set("Accept", "application/json");

  t.is(msg.status, 200);

  // user2,message 2
  const reg2 = await request(app)
    .post("/register")
    .send({
      email: "testy@testoo.com",
      username: "testyTest2",
      password: "testyPass"
    })
    .set("Accept", "application/json");

  t.is(reg2.status, 200);
  const log2 = await request(app)
    .post("/login")
    .send({
      password: "testyPass",
      username: "testyTest2"
    })
    .set("Accept", "application/json");

  t.is(log2.status, 200);

  const msg2 = await request(app)
    .post("/add_message")
    .send({
      text: "someTestyText2",
      flagged: false
    })
    .set("Accept", "application/json");

  t.is(msg2.status, 200);

  const rvpublic = await request(app)
    .get("/public")
    .send()
    .set("Accept", "application/json");
  // test that we got both messages
  t.is(
    rvpublic.body.result.filter(el => el.text == "someTestyText1").length,
    1
  );
  t.is(
    rvpublic.body.result.filter(el => el.text == "someTestyText2").length,
    1
  );

  // timeline of 2 shows just his messages
  let rv = await request(app)
    .get("/")
    .send()
    .set("Accept", "application/json");
  t.is(rv.body.result.filter(el => el.text == "someTestyText1").length, 0);
  t.is(rv.body.result.filter(el => el.text == "someTestyText2").length, 1);
  // 2 follows 1
  rv = await request(app)
    .get("/testyTest/follow")
    .send();
  rv = await request(app)
    .get("/")
    .send()
    .set("Accept", "application/json");
  // we should see both messages now
  t.is(rv.body.result.filter(el => el.text == "someTestyText1").length, 1);
  t.is(rv.body.result.filter(el => el.text == "someTestyText2").length, 1);
  // user's page should only display his messages
  rv = await request(app)
    .get("/testyTest2")
    .send();
  t.is(rv.body.response.filter(el => el.text == "someTestyText1").length, 0);
  t.is(rv.body.response.filter(el => el.text == "someTestyText2").length, 1);
  rv = await request(app)
    .get("/testyTest")
    .send();
  t.is(rv.body.response.filter(el => el.text == "someTestyText1").length, 1);
  t.is(rv.body.response.filter(el => el.text == "someTestyText2").length, 0);
  // now check 2 unfollows 1
  rv = await request(app)
    .get("/testyTest/unfollow")
    .send();
  rv = await request(app)
    .get("/")
    .send()
    .set("Accept", "application/json");
  t.is(rv.body.result.filter(el => el.text == "someTestyText1").length, 0);
  t.is(rv.body.result.filter(el => el.text == "someTestyText2").length, 1);
});
