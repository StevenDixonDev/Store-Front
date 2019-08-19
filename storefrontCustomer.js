const inquirer = require('inquirer');
const mysql = require('mysql');
const dotenv = require('dotenv');

dotenv.config();

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