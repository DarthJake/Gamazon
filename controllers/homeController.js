module.exports = function(request, responce){
    console.log("Home Controller Fired");
    responce.render('home', {"request": request});

}