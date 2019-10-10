var db = require('./../database');

var register = function(data, callback) {
    console.log('Login Model register called with: ' + data.first_name + ", " + data.last_name + ", " + data.username + ", " + data.password);
    
    db.query(`SELECT * FROM users WHERE username LIKE "${data.username}";`, (err, results, fields) => {
        if (err) {
            throw err;
        }
        console.log("results: " + results[0]);
        // For a real application use actual data validation for username/password
        if (typeof(results[0]) == 'undefined') { // Undefined means the username doesnt exists. Make one
            db.query(`INSERT INTO users(first_name, last_name, username, password) VALUES("${data.first_name}", "${data.last_name}", "${data.username}", "${data.password}");`, (err, results, fields) => {
                if (err) {
                    throw err;
                }
                console.log(results);
            });

            // get the user's id
            db.query(`SELECT user_id FROM users WHERE username = "${data.username}";`, (err, results, fields) => {
                if (err) {
                    throw err;
                }
                console.log("results: " + results[0]);
                callback(true, results[0].user_id);
            });
        } else { // There is a username with that name.
            callback(false);
        }
    });
}

module.exports = {
    register: register
};