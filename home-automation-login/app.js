const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const Promise = require("bluebird");
const morgan = require("morgan");
const helmet = require ("helmet");
const userRoutes = require("./api/routes/users");
const expressJwt = require('express-jwt');
const config = require("./config.json");
const deviceRoutes = require("./api/routes/devices");


mongoose.connect(
     "mongodb://localhost:27017/dbhome",
    {
        useNewUrlParser: true,
        useCreateIndex: true,
        useFindAndModify: false,
        useUnifiedTopology: true
    }
);
mongoose.Promise = Promise;


app.use(helmet());
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


// Routes which should handle requestsconfig
app.get('/favicon.ico', (req, res) => res.status(200));
app.get("/", (req, res, next) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    res.write("It's Working");
    res.end();
});


app.use("/user", userRoutes);
// app.use("/device",expressJwt({ secret: process.env.JWT_KEY || config.JWT_KEY, algorithms: ['HS256'] }),deviceRoutes );


app.use((req, res, next) => {
    const error = new Error("Not found");
    error.status = 404;
    next(error);
});

app.use((error, req, res, next) => {
    res.status(error.status || 404);
    console.log(error);
    res.json({
        error: {
            message: error.message
        }
    });
});



module.exports = app;