const inquirer = require("inquirer");
const connect = require("./mySQLConnection");
const queryToPromise = require("./queryPromisify");

const connection = connect();

function Manager(){
  this.connect = callback => {
    connection.connect(function(err) {
      if (err) throw err;
      callback(true);
    });
  };
  this.start = () =>{
    this.ask()
    .then(answers => {
      return this.mapChoiceToFunction(answers.userChoice);
    });
  }
  this.ask = () =>{
    inquirer.prompt([
      {
        type: 'list',
        name: 'userChoice',
        choices: [
          "View Products for sale",
          "View Low Inventory",
          "Add to Inventory",
          "Add New Product"
        ]
      }
    ])
  }
  this.mapChoiceToFunction = (choice) =>{
    switch (choice){
      case "View Products for sale": return this.showProducts();
      case "View Low Inventory": return this.showLowInvetory();
      case "Add to Inventory": return this.addToInventory();
      case "Add New Product": return this.addNewProdcut();
    }
  }
  this.showProducts = () =>{

  };
  this.showLowInvetory = () =>{

  }
  this.addToInventory = () =>{

  }
  this.addNewProdcut = ()=>{

  }
}

module.exports = Manager;