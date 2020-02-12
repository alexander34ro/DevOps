const mongoose = require('mongoose')

const MessageSchema = mongoose.Schema({
    message_id: mongoose.Schema.Types.ObjectId,
    author_id: String,
    text: String,
    pub_date: Date,
    flagged: Boolean
})

module.exports = mongoose.model('Message', MessageSchema)