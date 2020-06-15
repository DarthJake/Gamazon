var loginModel = require('./../models/loginModel');

module.exports = function(request, response){
    console.log("Login Controller Fired with mode " + request.method);
    
    if (request.method == "GET") { // Handle GET request
        response.render("login", {"request": request});
    } else if(request.method == "POST") {// Handle POST request
        loginModel.login(request.body, (isSuccessful, userID) => {
            // Checks to see if the login was successful
            if(isSuccessful) {
                console.log("\tSuccessfully Logged In");

                // Set a session variable for the user's ID
                request.session.userID = userID;
                response.redirect('/');
            } else {
                console.log("\tUnsuccessful Login");

                response.render("login", {"request": request});
            }
        });
    }
    
}