var express = require('express');
var router = express.Router();

// My controllers
var homeController = require('./controllers/homeController');
var catalogController = require('./controllers/catalogController');
var productController = require('./controllers/productController');
var accountController = require('./controllers/accountController');

router.get('/', function(req, res){
    homeController(router , req, res);
});

router.get('/catalog', function(req, res){
    catalogController(router , req, res);
});

router.get('/product/:id', function(req, res){
    productController(router , req, res);
});

router.post('/product/:id', function(req, res){
    productController(router , req, res);
});

router.get('/product', function(req, res){
    res.redirect("/catalog");
});

router.get('/youraccount', function(req, res){
    accountController(router , req, res);
});

//export the router
module.exports = router;