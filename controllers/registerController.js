var registerModel = require('./../models/registerModel');

module.exports = function(request, responce){
    console.log("Register Controller Fired with mode " + request.method);
    
    if (request.method == "GET") {
        responce.render("register", {"request": request});
    } else if(request.method == "POST") {
        registerModel.register(request.body, (isSuccessful, userID) => {
            console.log("From Register Controller: ");
            console.log("isSuccesful: " + isSuccessful);
            if(isSuccessful) {
                request.session.userID = userID;
                responce.redirect('/');
            } else {
                // Potential for error messaging system with querry string, etc
                responce.render("register", {"request": request});
            }
        });
    }
}