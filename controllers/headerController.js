var headerModel = require('./../models/headerModel');

module.exports = function(app, req, res){
    console.log("Header Controller Fired");
    
    headerModel.createNewUser(req.body.first_name, req.body.last_name, req.body.username, (isSuccessful) => {
        console.log("From Header Controller: ");
        console.log("Successfully made new user: " + isSuccessful);
        res.redirect("/");
    });
}