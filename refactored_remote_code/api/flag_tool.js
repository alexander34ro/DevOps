const express = require("express");
const app = express();
const routes = require("./routes/routes");
const mongoose = require('mongoose');
const Message = require('./models/message');

const dbPassword = 'nIfTcQjmAOFWH2kH'

mongoose.connect('mongodb+srv://admin:' + dbPassword + '@cluster0-zb0x5.mongodb.net/test?retryWrites=true&w=majority',{ useNewUrlParser: true, useUnifiedTopology: true });

const lineArguments = process.argv.slice(2, process.argv.length);
console.log(lineArguments);

if (lineArguments.length == 1 && lineArguments[0] == "-h"){
    console.log(
        `ITU-Minitwit Tweet Flagging Tool\n
               Usage:
                 flag_tool <tweet_id>...
                 flag_tool -i
                 flag_tool -h
               Options:
               -h            Show this screen.
               -i            Dump all tweets and authors to STDOUT.
        `
    )
    process.exit();
} else if (lineArguments.length == 1 && lineArguments[0] == "-i"){
    // show all messages
    Message.find()
        .then(result => {
            console.log(result);
        })
        .catch(err => {
            console.log("GET all messages ERROR", err);
        });
    process.exit();
} else {
    // flag messages from params
    lineArguments.forEach(message_id => {
        Message.findOneAndUpdate(
        {
            "message_id": mongoose.Types.ObjectId(message_id)
        },
        {
            "flagged": true
        },
        {
            new: true
        })
        .then( message => {
            console.log('Message id: ' + message_id + " flagged");
        })
        .catch(err => console.log("Message id: " + message_id + " is not existent; Err: "+ err));
    });
    process.exit();
}
