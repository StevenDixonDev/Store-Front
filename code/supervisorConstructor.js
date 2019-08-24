const inquirer = require("inquirer");
const connect = require("./mySQLConnection");
const queryToPromise = require("./queryPromisify");
const cTable = require('console.table');

const connection = connect();

function Supervisor() {
    this.connection = () => {
        return connection;
    }
    this.start = () =>{

    }
}

module.exports = Supervisor;