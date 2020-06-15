var accountModel = require('./../models/accountModel');

module.exports = function(request, response){
    console.log("Account Controller fired with userID " + request.session.userID + " and mode: " + request.method);
    
    // Check to see if a user is logged in and redirect to login if not
    if (typeof request.session.userID == 'undefined') {
        console.log("\tNo user logged in. Redirecting to login.");
        return response.redirect("/login");
    }

    if (request.method == "GET") { // Handle a GET request
        accountModel.getCart(request.session.userID, (cart) => {
            response.render('account', {"cart": cart, "request": request});
        });
    } else if (request.method == "POST") { // Handle a POST request
        // All this actually does is delete all the items from the users cart.
        // I don't really want to make a full on payment system right now.
        accountModel.purchase(request.session.userID); // No need for callback
        response.redirect('/');
    }

    
    

}