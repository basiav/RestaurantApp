const express = require('express');
const app = express();

const mongoose = require('./db/mongoose');
const bodyParser = require('body-parser');
var cors = require('cors');
const readline = require('readline').createInterface({
    input: process.stdin,
    output: process.stdout,
});

app.use(bodyParser.json());
app.use(cors());

const { Dish } = require("./db/models/dish.model");
const { User } = require("./db/models/user.model");
const { Review } = require("./db/models/review.model");
const { Star } = require("./db/models/star.model");

const { NativeDate } = require('mongoose');

// Import routes
const dishesRoute = require('./routes/dishes');
app.use('/dishes', dishesRoute);
const reviewsRoute = require('./routes/reviews');
app.use('/reviews', reviewsRoute);
const usersRoute = require('./routes/users');
app.use('/users', usersRoute);
const starsRoute = require('./routes/stars');
app.use('/stars', starsRoute);
const authRoute = require('./routes/auth');
app.use('/auth', authRoute);
const { prototype } = require('collections/listen/property-changes');


app.use(express.json())


// Listening on port, default: 3000, make sure it's free
let port = 3000;

const handleAnotherPort = function(currentPort) {
    let nextPort = currentPort += 1;
    readline.question(`Error has occured on port: ${currentPort}. 
    Try to handle the error by listening on port ${nextPort}? [Y/N]`, ans => {
        switch(ans) {
            case 'Y':
                console.log(`[Y] Great, let me try to listen on ${nextPort}...`);
                readline.close();
                listenOnPort(nextPort);
                break;
            default:
                console.log(`[N] Ignored. Try to handle the issue with port ${currentPort} on your own.`);
                readline.close();
                return;               
        }
    });
};

const listenOnPort = function(port) {
    app.listen(port, () => {
        console.log(`\nServer is listening on port ${port}\n`);
    }).on('error', function(err) { 
        console.log(`\n[app.js] ERROR while listening on port: ${port}\n${err}.\n`);
        handleAnotherPort(port);
    });
};


// app.listen
listenOnPort(port);