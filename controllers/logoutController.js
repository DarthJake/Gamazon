module.exports = function(request, response){
    console.log("Logout Controller fired for user id: " + request.session.userID);
    request.session.destroy(err => {
        if (err) {
            return response.redirect("/");
        }

        response.clearCookie("sid"); // "sid" is set in app.js as the session ID cookie
        response.redirect("/");
    })
}