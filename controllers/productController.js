var productModel = require('./../models/productModel');

module.exports = function(app, req, res){
    console.log("Product Controller Fired with id " + req.params.id);
    // var id = req.params.id;
    productModel.getProduct(req.params.id, (data) => {
        console.log("From Product Controller: ");
        console.log(typeof data);
        console.log(data);
        res.render('product', {data: data});
    });
    
}