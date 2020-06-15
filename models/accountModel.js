var db = require('./../database');

// Returns the contents of the cart for a specific user.
var getCart = function(user_id, callback) {
    console.log('Account Model getCart called with user_id: ' + user_id);
    db.query(`SELECT carts.product_id, products.name, carts.quantity FROM carts, products WHERE carts.product_id = products.product_id AND user_id = ${user_id};`, (err, results, fields) => {
        if (err) {
            throw err;
        }

        console.log("\tResults: "+ results);

        console.log("Returning to Account Controller with callback.");
        return callback(results);
    });
}

// Deletes all the items from the cart of a specified user
var purchase = function(user_id) {
    console.log('Account Model purchase called with user_id: ' + user_id);
    db.query(`DELETE FROM carts WHERE user_id = ${user_id};`, (err, results, fields) => {
        if (err) {
            throw err;
        }
    });
}

module.exports = {
    getCart: getCart,
    purchase: purchase
};