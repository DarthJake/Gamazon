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
var venderController = require('./controllers/venderController');
var pageNotFoundController = require('./controllers/pageNotFoundController');

// var headerController = require('./controllers/headerController');

/////////////////////////////////
/////     Get Requests    ///////
/////////////////////////////////
router.get('/', (request, responce) => {
    var {userID} = request.session;
    console.log(userID);
    homeController(request, responce);
});

router.get('/catalog', (request, responce) => {
    catalogController(request, responce);
});

router.get('/product/:id', (request, responce) => {
    productController(request, responce);
});

router.get('/product', (request, responce) => {
    responce.redirect("/catalog");
});

router.get('/account', (request, responce) => {
    accountController(request, responce);
});

router.get("/login", (request, responce) => {
    loginController(request, responce);
});

router.get("/register", (request, responce) => {
    registerController(request, responce);
});

router.get("/vender", (request, responce) => {
    venderController(request, responce);
});

/////////////////////////////////
/////    Post Requests    ///////
/////////////////////////////////
router.post('/product/:id', urlencodedParser, (request, responce) => {
    productController(request, responce);
});

router.post("/account", urlencodedParser, (request, responce) => {
    accountController(request, responce);
});

router.post("/login", urlencodedParser, (request, responce) => {
    loginController(request, responce);
});

router.post("/register", urlencodedParser, (request, responce) => {
    registerController(request, responce);
});

router.post("/logout", urlencodedParser, (request, responce) => {
    logoutController(request, responce);
});

router.post("/venderImageUpload", urlencodedParser, (request, responce) =>{
    // var keyName1=request.body;
    // console.log(request.files.pictureFile);
    if (!request.files || Object.keys(request.files).length === 0) {
        return responce.status(400).send('No files were uploaded.\n\n');
    }

    let pictureFile = request.files.pictureFile;

    pictureFile.mv('./pictureFile.jpg', function(err) {
        if (err){
          return responce.status(500).send(err);
        }
    
        responce.send('File uploaded!');
    });
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