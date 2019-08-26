const mysql = require('mysql');
const dotenv = require('dotenv');

dotenv.config();

function connect () {
  return  mysql.createConnection({
    host: '127.0.0.1',
    // Your port; if not 3306
    port: 3306,
    // Your username
    user: 'root',
    // Your password
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
  });
}


module.exports = connect;