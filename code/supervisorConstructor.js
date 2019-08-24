const inquirer = require("inquirer");
const connect = require("./mySQLConnection");
const queryToPromise = require("./queryPromisify");
const cTable = require('console.table');

const connection = connect();

function Supervisor() {
    this.connection = () => {
        return connection;
    }
    this.start = () => {
        this.ask()
            .then(this.mapChoiceToFunctions)
            .catch(err => {
                console.log(err);
            })
            .finally(() => {
                connection.end();
            });
    }
    this.ask = () => {
        return inquirer.prompt([
            {
                type: 'list',
                name: 'choice',
                choices: ["View Product Sales by Department", "Create New Department"]
            }
        ]);
    }
    this.mapChoiceToFunctions = ({ choice }) => {
        switch (choice) {
            case "View Product Sales by Department": return this.viewProducts();
            case "Create New Department": return '';
        }
    }
    this.viewProducts = () => {
        return queryToPromise(connection, "SELECT department_id, departments.department_name, over_head_costs, product_sales, (product_sales - over_head_costs) as total_profit from (Select department_name, sum(product_sales) as product_sales from products group by department_name)products join departments on products.department_name = departments.department_name;")
            .then((data) => {
                console.table(data);
                return data;
            })
    }
}

module.exports = Supervisor;