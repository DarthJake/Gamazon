var mysql = require('mysql');

// Create connection to db
const db = mysql.createConnection({
    host: 'localhost',
    user: 'theuser',
    password: 'password',
    database: 'mydb'
});

// Connect to db
db.connect((err) => {
    if (err) {
        throw err;
    }
    console.log("Mysql connected...");
});

module.exports = db;