const mysql = require('mysql2');


const db = mysql.createConnection({
    host: "localHost",
    user: "root",
    password: "1234",
    database: "employeeTracker_db",

});

module.exports = db;