module.exports = function(request, responce){
    console.log("Logout Controller fired for user " + request.session.userID);
    request.session.destroy(err => {
        if (err) {
            return responce.redirect("/");
        }

        responce.clearCookie("sid");// "sid" is set in app.js
        responce.redirect("/");
    })
}