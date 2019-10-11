var accountModel = require('./../models/accountModel');

module.exports = function(request, responce, mode){
    console.log("Account Controller fired with userID" + request.session.userID);
    if (typeof request.session.userID == 'undefined') {
        return responce.redirect("/login");
    }

    if (mode == "GET") {
        accountModel.getCart(request.session.userID, (cart) => {
            console.log("Account Controller get mode");
            console.log(cart);
            console.log(typeof cart);
            responce.render('account', {"cart": cart, "request": request});
        });
    } else if (mode == "POST") {
        console.log("Account Controller post mode");
        // All this actually does is delete all the items from the users cart.
        // I dont really want to make a full on payment system right now.
        accountModel.purchase(request.session.userID);
        responce.redirect('/');
    }

    
    

}