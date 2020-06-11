var db = require('./../database');
const PRODUCTS_PER_PAGE = 9;

// ejs will take care of putting the image and link from the id.
// I need to put page number so that I dont send the whole list of products to ejs.
// That could get problematic if the list of products is large.
var getProductIDs = function(pageNumber, callback) {
    lower = (PRODUCTS_PER_PAGE * (pageNumber - 1)) + 1;
    upper = (PRODUCTS_PER_PAGE * (pageNumber - 1)) + PRODUCTS_PER_PAGE;
    console.log('Catalog Model getProductIDs called with page: ' + pageNumber + " and lower: " + lower + " and upper: " + upper);
    db.query(`SELECT product_id FROM products WHERE product_id BETWEEN ${lower} AND ${upper};`, (err, results, fields) => {
        if (err) {
            throw err;
        }
        console.log("From Catalog Module: ");
        console.log(results);
        return callback(results);
    });

}

module.exports = {
    getProductIDs: getProductIDs
};