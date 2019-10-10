var db = require('./../database');

var login = function(data, callback) {
    console.log('Login Model register called with: ' + data.username + ", " + data.password);
    
    // Yes. I should do something like hashing to make the password stuff secure. But thats for a later time than now.
    let query = db.query(`SELECT * FROM users WHERE username = "${data.username}" AND password = "${data.password}";`, (err, results, fields) => {
        if (err) {
            throw err;
        }
        console.log("results: " + results[0]);
        if (typeof(results[0]) == 'undefined') { // Undefined means the username/password were incorrect.
            callback(false);
        } else { // The username and password match.
            callback(true);
        }
    });
}

module.exports = {
    login: login
};