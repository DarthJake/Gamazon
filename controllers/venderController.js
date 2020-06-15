var venderModel = require('./../models/venderModel');

module.exports = function (request, response) {
    console.log("Vender Controller Fired with userID: " + request.session.userID + " and mode: " + request.method);
    
    // Check to see if person is even logged in and redirect to login page if not
    if (typeof request.session.userID == 'undefined') {
        console.log("\tNo user logged in. Redirecting to login.");
        response.redirect("/login");
        return;
    }

    // Check if someone is a vender and redirect to home page if not and send vender page if so
    venderModel.getIsVenderAccount(request.session.userID, (isVender) => {
        if (!isVender) {
            console.log("\tNot a vender account. Redirecting to home page...");
            response.redirect("/");
            // Method should end here. No more code run here.
        } else {
            if (request.method == "GET") {
                response.render('vender', { "request": request });
            } else if (request.method == "POST") {
                venderModel.addProduct(
                        request.body.prod_name,
                        request.body.prod_price,
                        request.body.prod_manufacturer,
                        request.body.prod_description,
                        request.body.prod_origin, () => {
                            response.render('vender', { "request": request });
                });

                // Add image to local server
                if (!request.files.image_file || Object.keys(request.files).length === 0) {
                    console.log("\tNo file was uploaded...");
                    // console.log('\tFile info: ', request.files.image_file);
                } else {
                    venderModel.getLargestProductID((largestProductID) => {
                        // console.log('\tFile info: ', request.files.image_file);
                        var img = request.files.image_file;
                        var location = './public/assets/productImages/ID' + largestProductID + '.jpg';
                        img.mv(location, function(err) {
                            if (err){
                                throw err;
                            }
                        
                            console.log("\tImage file uploaded.");
                        });
                    });
                }
            }
        }
    });
}