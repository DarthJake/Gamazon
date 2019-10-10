var productModel = require('./../models/productModel');

module.exports = function(request, responce){
    console.log("Product Controller Fired with id " + request.params.id);
    
    productModel.getProduct(request.params.id, (data) => {
        console.log("From Product Controller: ");
        console.log(typeof(data));
        console.log(typeof(request));
        console.log(typeof(request.session));
        responce.render('product', {"data": data, "request": request});
    });
    
}