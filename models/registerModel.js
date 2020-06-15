var db = require('./../database');

var register = function(data, callback) {
    console.log('Register Model register called with: ' + data.first_name + ", " + data.last_name + ", " + data.username + ", " + data.password);
    
    db.query(`SELECT * FROM users WHERE username = "${data.username}";`, (err, results, fields) => {
        if (err) {
            throw err;
        }

        console.log("\tResults: " + results[0]);

        // For a real application use actual data validation for username/password
        if (typeof(results[0]) == 'undefined') { // Undefined means the username doesn't exists. Make one.
            db.query(`INSERT INTO users(first_name, last_name, username, password) VALUES("${data.first_name}", "${data.last_name}", "${data.username}", "${data.password}");`, (err, results, fields) => {
                if (err) {
                    throw err;
                }
                // console.log(results); // Don't care too much.
            });

            // Get the new user's id
            db.query(`SELECT user_id FROM users WHERE username = "${data.username}";`, (err, results, fields) => {
                if (err) {
                    throw err;
                }

                console.log("\tResults: " + results[0]);

                console.log("Returning to Register Controller with callback.");
                callback(true, results[0].user_id);
            });
        } else { // There is a username with that name.
            console.log("Returning to Product Controller with callback.");
            callback(false);
        }
    });
}

module.exports = {
    register: register
};