var data = [{item: 'get milk'}, {item: 'die'}, {item: 'walk dog'}];

module.exports = function(app, req, res){
    console.log("Home Controller Fired");
    res.render('home', {stuff: data});

}