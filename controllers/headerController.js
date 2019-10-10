var headerModel = require('./../models/headerModel');

module.exports = function(app, request, responce){
    console.log("Header Controller Fired");
    
    headerModel.createNewUser(request.body.first_name, request.body.last_name, request.body.username, (isSuccessful) => {
        console.log("From Header Controller: ");
        console.log("Successfully made new user: " + isSuccessful);
        responce.redirect("/");
    });
}