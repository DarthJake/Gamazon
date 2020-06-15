var productModel = require('./../models/productModel');

module.exports = function (request, response) {
    console.log("Product Controller Fired with id " + request.params.id + " and mode: " + request.method);

    if (request.method == "GET") { // Handle GET request
        productModel.getProduct(request.params.id, (data) => {
            response.render('product', { "data": data, "request": request });
        });
    } else if (request.method == "POST") { // Handle POST request
        productModel.addToCart(request.session.userID, request.params.id, request.body.quantity, () => {
            response.redirect("/catalog");
        });
    }

}