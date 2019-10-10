module.exports = function(app, request, responce){
    console.log("404 Controller Fired");
    responce.status(404).render('pageNotFound', {"request": request}); // Do I really need a controller for this? no.

    // responce.render('404', {"request": request});

}