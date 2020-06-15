var catalogModel = require('./../models/catalogModel');

module.exports = function(request, response){
    console.log("Catalog Controller Fired with page " + request.query.page);
    
    // Checks validity of requested page number
    var page = request.query.page;
    if (typeof(page) == 'undefined' || !parseInt(page) || page < 1) {
        page = 1;
        console.log("\tSince page was undefined/less than 1, it's now 1.");
    }

    catalogModel.getProductIDs(page, (productIDs) => {
        response.render('catalog', {"page": page, "request": request, "productIDs": productIDs});
    });
    
}