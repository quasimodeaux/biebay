var mysql = require('mysql');

var inquirer = require('inquirer');


var connection = mysql.createConnection({

	host: 'localhost',
	user: 'root',
	password: '',
	database: 'biebay'

})


    function addProduct() {
        inquirer.prompt([
            {
                type: 'input',
                message: 'Name of Item: ',
                name: 'productName'
            }, {
                type: 'input',
                message: 'Department: ',
                name: 'departmentName'
            }, {
                type: 'input',
                message: 'Price of item: $ ',
                name: 'price'
            }, {
                type: 'input',
                message: 'Stock Quantity: ',
                name: 'stockQuantity'
            }, {
                type: 'input',
                message: 'Autograph No or Yes (0 or 1) ',
                name: 'autograph'
            }
		
        ]).then(function (res) {
            connection.query("INSERT INTO `products` (`product_name`, `department_name`, `price`, `stock_quantity`, `autograph`) VALUES (?,?,?,?,?)", [res.productName, res.departmentName, res.price, res.stockQuantity, res.autograph], function (err, data) {
                if (err) throw err;
                console.log("Added new Product");
            })
        })
}