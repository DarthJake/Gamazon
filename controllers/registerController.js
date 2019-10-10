var registerModel = require('./../models/registerModel');

module.exports = function(app, request, responce, mode){
    console.log("Register Controller Fired with mode " + mode);
    
    if (mode == "GET") {
        responce.render("register", {"request": request});
    } else if(mode == "POST") {
        registerModel.register(request.body, (isSuccessful) => {
            console.log("From Register Controller: ");
            console.log("isSuccesful: " + isSuccessful);
            if(isSuccessful) {
                responce.redirect('/');
            } else {
                responce.render("register", {"request": request});
            }
        });
    }
    
}