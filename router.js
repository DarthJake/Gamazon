var express = require('express');
var bodyParser = require('body-parser');

var router = express.Router();
var urlencodedParser = bodyParser.urlencoded({extended: false});

// My controllers
var homeController = require('./controllers/homeController');
var catalogController = require('./controllers/catalogController');
var productController = require('./controllers/productController');
var accountController = require('./controllers/accountController');

var createNewUser = require('./private/createNewUser');

router.get('/', function(req, res){
    homeController(router , req, res);
});

router.post('/', urlencodedParser, function(req, res){
    console.log(req.body);
    createNewUser(req.body.first_name, req.body.last_name, req.body.username);
});

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

//export the router
module.exports = router;