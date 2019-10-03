var express = require('express');
var app = express();
var cookieParser = require('cookie-parser');

app.use(cookieParser());

// My router import
var router = require('./router.js');

// Set up template engine
app.set('view engine', 'ejs');

// Static files
app.use(express.static('./public'));

// Use routing module for '/' directory (all of it)
app.use('/', router);

// Listen to port
app.listen(3000);
console.log('You are listening to port 3000');