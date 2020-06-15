var db = require('./../database');
const PRODUCTS_PER_PAGE = 9;

// Gets the list of product IDs for a specific page of the catalog.
// This way only the products for a specific page are sent to the browser.
var getProductIDs = function(pageNumber, callback) {
    // Calculate first and last product numbers for the page
    lower = (PRODUCTS_PER_PAGE * (pageNumber - 1)) + 1;
    upper = (PRODUCTS_PER_PAGE * (pageNumber - 1)) + PRODUCTS_PER_PAGE;

    console.log('Catalog Model getProductIDs called with page: ' + pageNumber + " and lower: " + lower + " and upper: " + upper);
    
    db.query(`SELECT product_id FROM products WHERE product_id BETWEEN ${lower} AND ${upper};`, (err, results, fields) => {
        if (err) {
            throw err;
        }

        console.log("\tResults: "+ results);

        console.log("Returning to Catalog Controller with callback.");
        return callback(results);
    });
}

module.exports = {
    getProductIDs: getProductIDs
};