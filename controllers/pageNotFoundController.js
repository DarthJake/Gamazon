module.exports = function(request, response){
    // Do I really need a controller for this? no.
    // But I like things to be consistent 
    console.log("404 Controller Fired");
    response.status(404).render('pageNotFound', {"request": request});

    // response.render('404', {"request": request}); // Needs to be fixed...

}