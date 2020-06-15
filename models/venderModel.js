var db = require('./../database');

// Returns whether or not a user is a vender
var getIsVenderAccount = function (userID, callback) {
    console.log('Vender Model getIsVenderAccount called with userID: ' + userID);

    db.query(`SELECT is_vender FROM users WHERE userID = ${userID};`, (err, results, fields) => {
        if (err) {
            throw err;
        }

        console.log("\tResults: " + results[0].is_vender);

        console.log("Returning to Vender Controller with callback.");
        return callback(results[0].is_vender);
    });
}

// Returns the largest product ID in the database
var getLargestProductID = function (callback) {
    console.log('Vender Model getLargestProductID called');

    db.query(`SELECT product_id FROM products ORDER BY product_id DESC LIMIT 1;`, (err, results, fields) => {
        if (err) {
            throw err;
        }

        console.log("\tResults: " + results[0].product_id);

        console.log("Returning to Vender Controller with callback.");
        return callback(results[0].product_id);
    });
}

// Adds a product to the database
var addProduct = function (prod_name, prod_price, prod_manufacturer, prod_description, prod_origin, callback) {
    console.log('Vender Model addProduct called');

    db.query(
        `INSERT INTO products (name, price, manufacturer, description, origin) VALUES (
            '${prod_name}',
             ${prod_price},
            '${prod_manufacturer}',
            '${prod_description}',
            '${prod_origin}'
            );`, (err, results, fields) => {
        if (err) {
            throw err;
        }

        console.log("\tResults: " + results);

        console.log("Returning to Vender Controller with callback.");
        return callback();
    });
}

module.exports = {
    getIsVenderAccount: getIsVenderAccount,
    getLargestProductID: getLargestProductID,
    addProduct: addProduct
};