module.exports = function(request, responce){
    console.log("Catalog Controller Fired with page " + request.query.page);
    var page = request.query.page;
    responce.render('catalog', {"page": page, "request": request}); // This could be a problem. I changed {page} to {"page": page, "request": request}
}