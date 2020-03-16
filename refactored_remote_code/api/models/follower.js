const mongoose = require("mongoose");

const FollowerSchema = mongoose.Schema({
  // _id: mongoose.Schema.Types.ObjectId,
  who_id: String,
  whom_id: String
});

module.exports = mongoose.model("Follower", FollowerSchema);
