var db = require('./../database');

var getProduct = function(id, callback) {
    console.log('Product Model getProduct called with id: ' + id);
    let query = db.query(`SELECT * FROM products WHERE product_id = ${id};`, (err, results, fields) => {
        if (err) {
            throw err;
        }
        console.log("From productModule getProduct: ");
        console.log(results);
        return callback(results);
    });
}

var addToCart = function(user_id, product_id, quantity, callback) {
    console.log('Product Model addToCart called with product id: ' + product_id + " and user id" + user_id);
    let query = db.query(`INSERT INTO carts(user_id, product_id, quantity) VALUES("${user_id}", "${product_id}", "${quantity}");`, (err, results, fields) => {
        if (err) {
            throw err;
        }
        console.log("From productModule addToCart: ");
        console.log(results);
        return callback(results);
    });
}

module.exports = {
    getProduct: getProduct,
    addToCart: addToCart
};