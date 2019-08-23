const inquirer = require("inquirer");
const connect = require("./mySQLConnection");
const queryToPromise = require("./queryPromisify");

const connection = connect();

function Customer() {
  // test the connection
  this.connect = callback => {
    connection.connect(function(err) {
      if (err) throw err;
      callback(true);
    });
  };
  this.start = () => {
    this.queryDataBase();
  };
  this.ask = () => {
    // use inquirer to ask customer for id and quantity.
    return inquirer.prompt([
      {
        name: "id",
        message: "Please provide an ID for the item you wish to purchase."
      },
      {
        name: "quantity",
        message: "Please provide the quantity of how many you wish to purchase."
      }
    ]);
  };
  // display database data in console
  this.show = dataToShow => {
    if (typeof dataToShow !== "string") {
      console.log(
        dataToShow.map(
          item =>
            `id: ${item.item_id} |  name: ${item.product_name} | quantity: ${item.stock_quanity}`
        )
      );
    }
    return dataToShow;
  };
  this.queryDataBase = () => {
    queryToPromise(connection, "SELECT * FROM products;")
      .then(data => {
        return this.show(data);
      })
      .then(() => {
        this.ask().then(data => this.handleInput(data));
      })
      .catch(err => {
        console.log(err);
        if (connection.state !== "disconnected") connection.end();
      });
  };
  // input is an object from inquirer
  this.handleInput = ({ id, quantity }) => {
    queryToPromise(connection, "SELECT * FROM products WHERE item_id = ?", [id])
      .then(res => {
        if (res.length > 0) {
          if (res[0].stock_quanity < quantity) {
            throw "Insufficient quanity!";
          } else {
            this.handleResult(id, quantity, res[0].stock_quanity, res[0].price);
          }
        } else {
          throw "An item with that name or id does not exist.";
        }
      })
      .catch(err => {
        console.log(err);
        connection.end();
      });
  };
  this.handleResult = (id, quanity, stockQuantity, price) => {
    queryToPromise(connection, "UPDATE products set stock_quanity = ? WHERE item_id = ?",
    [stockQuantity - quanity, id]).then(res =>{
      console.log("Purchase successful, thank you for your purchase.");
      console.log(`Total spent: $${quanity * price}`);
      connection.end();
    }).catch(err =>{
      console.log(err);
      connection.end();
    })
  };
}

module.exports = Customer;
