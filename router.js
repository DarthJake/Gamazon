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
router.get('/', (request, response) => {
    // var {userID} = request.session;
    // console.log(userID);
    homeController(request, response);
});

router.get('/catalog', (request, response) => {
    catalogController(request, response);
});

router.get('/product/:id', (request, response) => {
    productController(request, response);
});

router.get('/product', (request, response) => {
    response.redirect("/catalog");
});

router.get('/account', (request, response) => {
    accountController(request, response);
});

router.get("/login", (request, response) => {
    loginController(request, response);
});

router.get("/register", (request, response) => {
    registerController(request, response);
});

router.get("/vender", (request, response) => {
    venderController(request, response);
});

/////////////////////////////////
/////    Post Requests    ///////
/////////////////////////////////
router.post('/product/:id', urlencodedParser, (request, response) => {
    productController(request, response);
});

router.post("/account", urlencodedParser, (request, response) => {
    accountController(request, response);
});

router.post("/login", urlencodedParser, (request, response) => {
    loginController(request, response);
});

router.post("/register", urlencodedParser, (request, response) => {
    registerController(request, response);
});

router.post("/logout", urlencodedParser, (request, response) => {
    logoutController(request, response);
});

router.post("/vender", urlencodedParser, (request, response) => {
    venderController(request, response);
});

router.post("/venderImageUpload", urlencodedParser, (request, response) =>{
    // var keyName1=request.body;
    // console.log(request.files.pictureFile);
    if (!request.files || Object.keys(request.files).length === 0) {
        return response.status(400).send('No files were uploaded.\n\n');
    }

    let pictureFile = request.files.pictureFile;

    pictureFile.mv('./pictureFile.jpg', function(err) {
        if (err){
          return response.status(500).send(err);
        }
    
        response.send('File uploaded!');
    });
});

/////////////////////////////////
/////         404         ///////
/////////////////////////////////
// Keep as the last call
// router.use(function(request, response){ // Is being BUGGYYYY!!!
//     pageNotFoundController(request, response);
// });

//export the router
module.exports = router; // Just in case