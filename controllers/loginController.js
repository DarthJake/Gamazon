var loginModel = require('./../models/loginModel');

module.exports = function(request, responce){
    console.log("Login Controller Fired with mode " + request.method);
    
    if (request.method == "GET") {
        responce.render("login", {"request": request});
    } else if(request.method == "POST") {
        loginModel.login(request.body, (isSuccessful, userID) => {
            console.log("From Login Controller: ");
            console.log("isSuccesful: " + isSuccessful);
            if(isSuccessful) {
                request.session.userID = userID;
                responce.redirect('/');
            } else {
                // Potential for error messaging system with querry string, etc
                responce.render("login", {"request": request});
            }
        });
    }
    
}