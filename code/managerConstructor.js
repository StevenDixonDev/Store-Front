const inquirer = require("inquirer");
const connect = require("./mySQLConnection");
const queryToPromise = require("./queryPromisify");

const connection = connect();

function Manager(){
  this.connection = () =>{
    return connection;
  }
  this.start = () =>{
    this.ask()
    .then(answers => {
      return this.mapChoiceToFunction(answers.userChoice);
    }).catch(err => {
      console.log(err);
    })
    .finally(()=>{
      connection.end();
    })
  }
  this.ask = () =>{
    return inquirer.prompt([
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
    return queryToPromise(connection, "SELECT * from products")
    .then((data)=>{
      console.log(data.map(item => `Id: ${item.item_id} | Name: ${item.product_name} | Quantity: ${item.stock_quanity}`))
      return data;
    })
  };
  this.showLowInvetory = () =>{
    return queryToPromise(connection, "SELECT * from products WHERE stock_quanity < 20")
    .then((data)=>{
      console.log(data.map(item => `Id: ${item.item_id} | Name: ${item.product_name} | Quantity: ${item.stock_quanity}`))
      return data;
    })
  }
  this.addToInventory = () =>{

  }
  this.addNewProdcut = ()=>{

  }
}

module.exports = Manager;