var venderModel = require('./../models/venderModel');

module.exports = function (request, responce) {
    console.log("Vender Controller Fired with mode: " + request.method);

    if (request.method == "GET") {
        responce.render('vender', { "data": data, "request": request });
    } else if (request.method == "POST") {
        venderModel.addProduct(request.session.userID, 
                request.body.prod_name,
                request.body.prod_price,
                request.body.prod_manufacturer,
                request.body.prod_description,
                request.body.prod_origin, () => {
            console.log("From Vender Controller ");
            // responce.redirect("/catalog");
        });
    }

}