var db = require('../database');

var createNewUser = function(first, last, user, callback) {
    console.log('Header Model createNewUser called with: ' + first + ", " + last + ", " + user + ", ");
    let query = db.query(`SELECT 1 FROM users WHERE username = "${user}" ORDER BY username LIMIT 1;`, (err, results, fields) => {
        if (err) {
            throw err;
        }

        if (results.length > 0) {
            console.log("User already found. Dont make another.")
            callback(false);
        } else {
            let query = db.query(`INSERT INTO users(first_name, last_name, username) VALUES("${first}", "${last}", "${user}");`, (err, results, fields) => {
                if (err) {
                    throw err;
                }
            });
            callback(true);
        }
        
    });

    
}

module.exports = {
    createNewUser: createNewUser
}