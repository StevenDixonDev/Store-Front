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
}

const customer = new Customer();

module.exports = customer;