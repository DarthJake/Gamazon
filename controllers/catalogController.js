module.exports = function(app, req, res){
    console.log("Catalog Controller Fired with page " + req.query.page);
    var page = req.query.page;
    res.render('catalog', {page});
}