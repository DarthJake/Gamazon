var db = require('./../database');

var getProduct = function(id, callback) {
    console.log('Product Model getProduct called with id: ' + id);
    let query = db.query(`SELECT * FROM products WHERE product_id = ${id}`, (err, results, fields) => {
        if (err) {
            throw err;
        }
        console.log("From productModule: ");
        console.log(typeof results);
        console.log(results);
        return callback(results);
    });
}

module.exports = {
    getProduct: getProduct
};