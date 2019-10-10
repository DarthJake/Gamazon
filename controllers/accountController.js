var data = [{item: 'get milk'}, {item: 'die'}, {item: 'walk dog'}];

module.exports = function(app, request, responce){
    console.log("Account Controller fired with ");
    responce.render('account', {"stuff": data, "request": request});

}