var db = require('./../database');

// Returns the information for a specified product
var getProduct = function(id, callback) {
    console.log('Product Model getProduct called with id: ' + id);
    
    let query = db.query(`SELECT * FROM products WHERE product_id = ${id};`, (err, results, fields) => {
        if (err) {
            throw err;
        }
        
        console.log("\tResults: " + results);

        console.log("Returning to Product Controller with callback.");
        return callback(results);
    });
}

// Adds a product to a user's cart
var addToCart = function(user_id, product_id, quantity, callback) {
    console.log('Product Model addToCart called with product id: ' + product_id + " and user id" + user_id);
    
    let query = db.query(`INSERT INTO carts(user_id, product_id, quantity) VALUES("${user_id}", "${product_id}", "${quantity}");`, (err, results, fields) => {
        if (err) {
            throw err;
        }
        
        console.log("\tResults: " + results);

        console.log("Returning to Product Controller with callback.");
        return callback(results);
    });
}

module.exports = {
    getProduct: getProduct,
    addToCart: addToCart
};