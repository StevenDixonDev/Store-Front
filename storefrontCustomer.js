const inquirer = require('inquirer');
const mysql = require('mysql');
const dotenv = require('dotenv');

dotenv.config();

const connection = mysql.createConnection({
  host: "127.0.0.1",
  // Your port; if not 3306
  port: 3306,
  // Your username
  user: "root",
  // Your password
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME
});


connection.connect(function(err) {
  if (err) throw err;
  console.log("connected as id " + connection.threadId);
  connection.end();
});


function Customer(){
  this.connect = ()=>{
    return true;
  }
  this.start = () =>{

  }
  this.ask = () =>{
    return inquirer.prompt([
        {
          name: "id",
          message: "Please provide an ID for the item you wish to purchase."
        },
        {
          name: "quantityt",
          message: "Please provide the quantity of how many you wish to purchase."
        }
    ])
  }
}

const customer = new Customer();

module.exports = customer;