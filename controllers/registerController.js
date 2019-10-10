var registerModel = require('./../models/registerModel');

module.exports = function(request, responce, mode){
    console.log("Register Controller Fired with mode " + mode);
    
    if (mode == "GET") {
        responce.render("register", {"request": request});
    } else if(mode == "POST") {
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