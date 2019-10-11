var accountModel = require('./../models/accountModel');

module.exports = function(request, responce){
    console.log("Account Controller fired with userID" + request.session.userID);
    if (typeof request.session.userID == 'undefined') {
        return responce.redirect("/login");
    }

    accountModel.getCart(request.session.userID, (cart) => {
        console.log("From Account Controller: ");
        console.log(cart);
        console.log(typeof cart);
        responce.render('account', {"cart": cart, "request": request});
    });
    

}