var data = [{item: 'get milk'}, {item: 'die'}, {item: 'walk dog'}];

module.exports = function(app, req, res){
    console.log("Account Controller fired with ");
    res.render('account', {stuff: data});

}