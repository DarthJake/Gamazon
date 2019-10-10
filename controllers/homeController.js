var data = [{item: 'get milk'}, {item: 'die'}, {item: 'walk dog'}];

module.exports = function(app, request, responce){
    console.log("Home Controller Fired");
    responce.render('home', {"stuff": data, "request": request});

}