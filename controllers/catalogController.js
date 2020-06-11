var catalogModel = require('./../models/catalogModel');

module.exports = function(request, responce){
    console.log("Catalog Controller Fired with page " + request.query.page);
    var page = request.query.page;
    if (typeof(page) == 'undefined' || page < 1) {
        page = 1;
        console.log("Since page was undefined/less than 1, its now 1.")
    }

    catalogModel.getProductIDs(page, (productIDs) => {
        console.log("From Catalog Controller: ");
        console.log(productIDs);
        responce.render('catalog', {"page": page, "request": request, "productIDs": productIDs});
    });
    
}