var productModel = require('./../models/productModel');

module.exports = function(app, id, res){
    console.log("Product Controller Fired with id " + id);
    
    productModel.getProduct(id, (data) => {
        console.log("From Product Controller: ");
        console.log(typeof data);
        console.log(data);
        res.render('product', {data: data});
    });
    
}