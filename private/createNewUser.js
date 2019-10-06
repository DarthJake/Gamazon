var db = require('../database');

module.exports = function(first, last, user) {
    console.log('Header Model createNewUser called with: ' + first + ", " + last + ", " + user + ", ");
    let query = db.query(`INSERT INTO users(first_name, last_name, username) VALUES("${first}", "${last}", "${user}");`, (err, results, fields) => {
        if (err) {
            throw err;
        }
    });
}

// module.exports = {
//     createNewUser: createNewUser
// }