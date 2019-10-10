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
    homeController(router , request, responce);
});

router.get('/catalog', (request, responce) => {
    catalogController(router , request, responce);
});

router.get('/product/:id', (request, responce) => {
    productController(router , request, responce);
});

router.get('/product', (request, responce) => {
    responce.redirect("/catalog");
});

router.get('/youraccount', (request, responce) => {
    accountController(router , request, responce);
});

router.get("/login", (request, responce) => {
    loginController(router , request, responce, "GET");
});

router.get("/register", (request, responce) => {
    registerController(router , request, responce, "GET");
});

/////////////////////////////////
/////    Post Requests    ///////
/////////////////////////////////
router.post("/login", urlencodedParser, (request, responce) => {
    loginController(router , request, responce, "POST");
});

router.post("/register", urlencodedParser, (request, responce) => {
    registerController(router, request, responce, "POST");
});

router.post("/logout", urlencodedParser, (request, responce) => {
    logoutController(router, request, responce);
});

/////////////////////////////////
/////         404         ///////
/////////////////////////////////
// Keep as the last call
router.use(function(request, responce){
    pageNotFoundController(router, request, responce);
});

//export the router
module.exports = router; // Just in case