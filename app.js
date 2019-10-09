var express = require('express');
var session = require('express-session');
var app = express();

// My router import
var router = require('./router.js');

// Set up template engine
app.set('view engine', 'ejs');

// Static files
app.use(express.static('./public'));

// Session
app.use(session({
    name: "sid",
    resave: false,
    saveUninitialized: false,
    secret: "#~6tp!Dw*g')IYAYMD<6Eb", // This really should be better but were just learning so.
    // store:  // I could use this to make it so it stores the session data on the database but for now well just use the default in memory store.
    cookie: {
        maxAge: 1000 * 60 * 60 * 2, //Two hours in milliseconds.
        sameSite: true,
        secure: false, // OK since just in production.

    }
}));

// Use routing module for '/' directory (all of it)
app.use('/', router);

// Listen to port
app.listen(3000);
console.log('You are listening to port 3000');