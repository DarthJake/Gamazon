var db = require('./../database');

var getIsVenderAccount = function (user_id, callback) {
    console.log('Vender Model getIsVenderAccount called with user_id: ' + user_id);

    db.query(`SELECT is_vender FROM users WHERE user_id = ${user_id};`, (err, results, fields) => {
        if (err) {
            throw err;
        }
        console.log("Is Vender: " + results[0].is_vender);
        return callback(results[0].is_vender);

        // console.log("From Vender Module: ");

        // console.log("Is Vender: " + results[0].is_vender);
        // console.log("Type: " + typeof(results[0].is_vender))
        // console.log("Test: " + Object.keys(results[0].is_vender));
        
        // return callback(results[0].is_vender);
    });
}

var getLargestProductID = function (callback) {
    console.log('Vender Model getLargestProductID called');

    db.query(`SELECT product_id FROM products ORDER BY product_id DESC LIMIT 1;`, (err, results, fields) => {
        if (err) {
            throw err;
        }
        console.log("Largest ID: " + results[0].product_id);
        return callback(results[0].product_id);
    });
}

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

        console.log(results);
        return callback();
    });
}

module.exports = {
    getIsVenderAccount: getIsVenderAccount,
    getLargestProductID: getLargestProductID,
    addProduct: addProduct
};