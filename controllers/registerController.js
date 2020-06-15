var registerModel = require('./../models/registerModel');

module.exports = function(request, response){
    console.log("Register Controller Fired with mode " + request.method);
    
    if (request.method == "GET") { // Handle GET request
        response.render("register", {"request": request});
    } else if(request.method == "POST") { // Handle POST request
        registerModel.register(request.body, (isSuccessful, userID) => {
            if(isSuccessful) {
                console.log("\tSuccessfully Registered");

                request.session.userID = userID; // Also logs the user in.
                response.redirect('/');
            } else {
                console.log("\tUnsuccessfully Registered");

                response.render("register", {"request": request});
            }
        });
    }
}