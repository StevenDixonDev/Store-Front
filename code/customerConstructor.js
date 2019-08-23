const inquirer = require("inquirer");
const connect = require("./mySQLConnection");
const queryToPromise = require("./queryPromisify");

const connection = connect();

function Customer() {
  // test the connection
  this.connection = () =>{
    return connection;
  }
  this.start = () => {
    // query the data base to display data for the user to use
    this.queryDataBase()
      .then(() => {
        // ask the user to provide info using inquirer
        return this.ask();
      })
      .then(data => {
        // handle the data the user provided and query the DB for info on the product
        return this.handleInput(data);
      })
      .then(data => {
        // handle the result of the users input and buying the items from the db
        this.handleResult(...data);
      }).finally(()=>{
        connection.end();
      })
      .catch(err => {
        console.log(err);
        connection.end();
      });
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
            `id: ${item.item_id} |  name: ${item.product_name} | quantity: ${
              item.stock_quanity
            }`
        )
      );
    }
    // return data so that we can use it in the next then function
    return dataToShow;
  };
  this.queryDataBase = () => {
    return queryToPromise(connection, "SELECT * FROM products;")
    .then(data => {
      return this.show(data);
    });
  };
  // input is an object from inquirer
  this.handleInput = ({ id, quantity }) => {
    return queryToPromise(
      connection,
      "SELECT * FROM products WHERE item_id = ? OR product_name = ?;",
      [id, id]
    ).then(res => {
      if (res.length > 0) {
        if (res[0].stock_quanity < quantity) {
          throw "Insufficient quanity!";
        } else {
          return [id, quantity, res[0].stock_quanity, res[0].price];
        }
      } else {
        throw "An item with that name or id does not exist.";
      }
    });
  };
  // function to handle the purchasing of items , removing the number from the db and informing the user
  this.handleResult = (id, quanity, stockQuantity, price) => {
    // Update db with new product quantity
    return queryToPromise(
      connection,
      "UPDATE products set stock_quanity = ? WHERE item_id = ?;",
      [stockQuantity - quanity, id]
    ).then(res => {
      console.log("Purchase successful, thank you for your purchase.");
      console.log(`Total spent: $${quanity * price}`);
    });
  };
}

module.exports = Customer;
