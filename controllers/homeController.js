module.exports = function(request, response){
    console.log("Home Controller Fired");
    response.render('home', {"request": request});
}