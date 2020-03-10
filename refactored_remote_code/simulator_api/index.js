const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const routes = require("./routes/routes");
const cors = require('cors');
const mongoose = require('mongoose');
const Sentry = require('@sentry/node');

Sentry.init({
  dsn: "https://435d4b6577fc4daba667b426c9d01388@sentry.io/3253377"
});

// The request handler must be the first middleware on the app
app.use(Sentry.Handlers.requestHandler());

app.use(cors());

const dbPassword = 'nIfTcQjmAOFWH2kH'

mongoose.connect('mongodb+srv://admin:' + dbPassword + '@cluster0-zb0x5.mongodb.net/prod?retryWrites=true&w=majority',{ useNewUrlParser: true, useUnifiedTopology: true });

let port = process.env.PORT || 8090;

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

const corsWhitelist = [
    'http://localhost:8090/',
    'http://localhost:8100/',
    'http://localhost:3000/',
    'http://localhost:8080/'
]

app.use((req, res, next)=>{
    res.header('Access-Control-Allow-Origin', '*');
    if(corsWhitelist.indexOf(req.headers.origin)!== -1){
        res.header('Access-Control-Allow-Origin', req.headers.origin);
        res.header('Access-Control-Allow-Headers', 'Origin, Content-Type, X-Requested-With, Accept, Authorization');
    }
    if(req.method === 'OPTIONS'){
        res.header('Access-Control-Allow-Methods','GET, PUT, POST, PATCH, DELETE');
        res.status(200).json({});
    }
    next();
})

app.use("/", routes);

app.get("/debug-sentry", function mainHandler(req, res) {
  throw new Error("My first Sentry error!");
});

// The error handler must be before any other error middleware
app.use(Sentry.Handlers.errorHandler());

app.listen(port, ()=> console.log("Listening to 8090..."));