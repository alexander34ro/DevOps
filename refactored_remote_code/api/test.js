const test = require("ava");
const request = require("supertest");
const { MongoMemoryServer } = require("mongodb-memory-server");
const mongoose = require("mongoose");

const app = require('./index');
const User = require('./models/user');
const Message = require('./models/message');
const Follower = require('./models/follower');

// Start MongoDB instance
const mongod = new MongoMemoryServer()

// Create connection to Mongoose before tests are run
test.before(async () => {
	const uri = await mongod.getConnectionString();
	await mongoose.connect(uri, {useMongoClient: true});
});

// Add dummy data to Mongoose before each test is run
test.beforeEach(async () => {
  const user = new User({
    username: "foobar",
    email: "foo@bar.com",
    pw_hash: "pff" 
  });
  await user.save();
});

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
