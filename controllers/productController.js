var productModel = require('./../models/productModel');

module.exports = function (request, responce, mode) {
    console.log("Product Controller Fired with id " + request.params.id + " and mode: " + mode);

    if (mode == "GET") {
        productModel.getProduct(request.params.id, (data) => {
            console.log("From Product Controller getProduct: ");
            responce.render('product', { "data": data, "request": request });
        });
    } else if (mode == "POST") {
        productModel.addToCart(request.session.userID, request.params.id, request.body.quantity, () => {
            console.log("From Product Controller getProduct: ");
            responce.redirect("/");
        });
    }

}