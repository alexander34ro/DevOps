const test = require("ava");
const request = require("supertest");
const {MongoMemoryServer}   = require("mongodb-memory-server");
const mongoose = require("mongoose");
const express = require('express');
const app = require('./index');
const User = require('./models/user');
const Message = require('./models/message');
const Follower = require('./models/follower');

// Start MongoDB instance
const mongod = new MongoMemoryServer()
const dbPassword = 'nIfTcQjmAOFWH2kH'
// Create connection to Mongoose before tests are run
test.before(async () => {
	const uri = await mongod.getConnectionString();
	await mongoose.connect('mongodb+srv://admin:' + dbPassword + '@cluster0-zb0x5.mongodb.net/test?retryWrites=true&w=majority', {useMongoClient: true});
  // await mongoose.connect(uri, {useMongoClient: true});
});

// Add dummy data to Mongoose before each test is run
// test.beforeEach(async () => {
//   const eachTestMockUser1 = new User({
//     username: "foobar",
//     email: "foo@bar.com",
//     pw_hash: "pff" 
//   });
//   await eachTestMockUser1.save();
// }); commented because unnecessary

// test.afterEach.always(() => User.remove());// same as above
test.after.always(async () => {
	mongoose.disconnect()
	mongod.stop()
})
test.serial('register', async t => {
  let rv=null;
 // const {app} = t.context;
  const mockUser = new User({
    _id: new mongoose.Types.ObjectId(),
    username: "testytest112",
    email: "testy@testoo.com",
    password: "testyPass",
    pw_hash: "notImportantForThisTest"
}) // BAD CQ BUT REMEMBER TO EDIT THE REQUEST TOO!!!
  

	const res = await request(app)
		.post('/register')
		.send({
			"email": "testy@testoo.com",
      "username":"testytest112",
      "password": "testyPass"
      
		}).set('Accept', 'application/json');

	t.is(res.status, 200);
	

	// Verify that user is created in DB
  const newUser = await User.findOne({email: mockUser.email});
  t.is(newUser.username, mockUser.username);
  const rem = await User.remove({"username":mockUser.username});
 
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
