var db = require('./../database');

var getCart = function(user_id, callback) {
    console.log('Account Model getCart called with user_id: ' + user_id);
    db.query(`SELECT carts.product_id, products.name, carts.quantity FROM carts, products WHERE carts.product_id = products.product_id AND user_id = ${user_id};`, (err, results, fields) => {
        if (err) {
            throw err;
        }
        console.log("From Account Module: ");
        console.log(results);
        return callback(results);
    });

}

module.exports = {
    getCart: getCart
};