const mongoose = require('mongoose')

const UserSchema = mongoose.Schema({
    user_id: mongoose.Schema.Types.ObjectId,
    username: String,
    email: String,
    pw_hash: String 
})

module.exports = mongoose.model('User', UserSchema)