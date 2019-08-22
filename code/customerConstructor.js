const inquirer = require('inquirer');
const connect = require("./mySQLConnection");

const connection = connect();

function Customer(){
    this.connect = (callback)=>{
      connection.connect(function(err) {
        if (err) throw err;
        //console.log("connected as id " + connection.threadId);
        callback(true);
      });
    }
    this.start = () =>{
      this.ask().then((data)=>this.handleInput(data, this.handleResult));
    }
    this.ask = () =>{
      return inquirer.prompt([
          {
            name: "id",
            message: "Please provide an ID for the item you wish to purchase."
          },
          {
            name: "quantity",
            message: "Please provide the quantity of how many you wish to purchase."
          }
      ])
    }
    this.show = () =>{
  
    }
    // input is an object from inquirer
    this.handleInput = ({id, quantity}, callback) =>{
      connection.query("SELECT * FROM products WHERE item_id = ?", [id], (err, res) => {
        if(err) throw err;
        if(res.length > 0){
          // if number avialable is less than number requested
          if(res[0].stock_quanity < quantity){
            connection.end();
            // send back message there is not enough items
            return callback("Insufficient quanity!");
          }else{
            // otherwise pass data so that we can handle result
            callback(id, quantity, res[0].stock_quanity);
            return connection.end();
          }
        }else{
          connection.end();
        }
      })
    }
    this.handleResult = (id, quanity, stockQuantity) =>{
      if(!parseInt(id)){
        return console.log(id); 
      }else{
        connection.query("UPDATE products set stock_quanity = ? WHERE item_id = ?", [(stockQuantity - quanity), id], (err, res) => {
          if(err) throw err;
          console.log("Purchase successful, thank you for your purchase.")
        })
      }
      connection.end();
    }
  }
  
  module.exports = Customer;