var loginModel = require('./../models/loginModel');

module.exports = function(app, request, responce, mode){
    console.log("Login Controller Fired with mode " + mode);
    
    if (mode == "GET") {
        responce.render("login", {"request": request});
    } else if(mode == "POST") {
        loginModel.login(request.body, (isSuccessful) => {
            console.log("From Login Controller: ");
            console.log("isSuccesful: " + isSuccessful);
            if(isSuccessful) {
                responce.redirect('/');
            } else {
                responce.render("login", {"request": request});
            }
        });
    }
    
}