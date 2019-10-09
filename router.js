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

// var headerController = require('./controllers/headerController');

router.get('/', function(req, res){
    // var {userID} = req.session;
    // console.log(userID);
    homeController(router , req, res);
});

// router.post('/createNewUser', urlencodedParser, function(req, res){
//     headerController(router, req, res);
// });

router.get('/catalog', function(req, res){
    catalogController(router , req, res);
});

router.get('/product/:id', function(req, res){
    productController(router , req.params.id, res);
});

router.get('/product', function(req, res){
    res.redirect("/catalog");
});

router.get('/youraccount', function(req, res){
    accountController(router , req, res);
});

router.get("/login", function(req, res){
    loginController(router , req, res);
});

router.get("/register", function(req, res){
    registerController(router , req, res);
});

//export the router
module.exports = router; // Just in case