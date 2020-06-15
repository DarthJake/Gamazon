var db = require('./../database');

// Validates a user's login information
var login = function(data, callback) {
    console.log('Login Model login called with username: ' + data.username + ", and password: " + data.password);
    
    // Yes. I should do something like hashing and salting to make the password stuff secure. But thats for a later time than now.
    db.query(`SELECT * FROM users WHERE username = "${data.username}" AND password = "${data.password}";`, (err, results, fields) => {
        if (err) {
            throw err;
        }

        console.log("\tResults: " + results[0]);
        
        if (typeof(results[0]) == 'undefined') { // Undefined means the username/password were incorrect.
            console.log("Returning to Login Controller with callback.");
            callback(false);
        } else { // The username and password match.
            console.log("Returning to Login Controller with callback.");
            callback(true, results[0].user_id);
        }
    });
}

module.exports = {
    login: login
};