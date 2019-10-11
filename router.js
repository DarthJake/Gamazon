var express = require('express');
var bodyParser = require('body-parser');

var router = express.Router();
var urlencodedParser = bodyParser.urlencoded({extended: false});

// My controllers
var homeController = require('./controllers/homeController');
var catalogController = require('./controllers/catalogController');
var productController = require('./controllers/productController');
var accountController = require('./controllers/accountController');
var loginController = require('./controllers/loginController');
var registerController = require('./controllers/registerController');
var logoutController = require('./controllers/logoutController');
var pageNotFoundController = require('./controllers/pageNotFoundController');

// var headerController = require('./controllers/headerController');

/////////////////////////////////
/////     Get Requests    ///////
/////////////////////////////////
router.get('/', (request, responce) => {
    // var {userID} = req.session;
    // console.log(userID);
    homeController(request, responce);
});

router.get('/catalog', (request, responce) => {
    catalogController(request, responce);
});

router.get('/product/:id', (request, responce) => {
    productController(request, responce, "GET");
});

router.get('/product', (request, responce) => {
    responce.redirect("/catalog");
});

router.get('/account', (request, responce) => {
    accountController(request, responce);
});

router.get("/login", (request, responce) => {
    loginController(request, responce, "GET");
});

router.get("/register", (request, responce) => {
    registerController(request, responce, "GET");
});

/////////////////////////////////
/////    Post Requests    ///////
/////////////////////////////////
router.post('/product/:id', urlencodedParser, (request, responce) => {
    productController(request, responce, "POST");
});

router.post("/login", urlencodedParser, (request, responce) => {
    loginController(request, responce, "POST");
});

router.post("/register", urlencodedParser, (request, responce) => {
    registerController(request, responce, "POST");
});

router.post("/logout", urlencodedParser, (request, responce) => {
    logoutController(request, responce);
});

/////////////////////////////////
/////         404         ///////
/////////////////////////////////
// Keep as the last call
// router.use(function(request, responce){ // Is being BUGGYYYY!!!
//     pageNotFoundController(request, responce);
// });

//export the router
module.exports = router; // Just in case