var mysql = require('mysql');

var inquirer = require('inquirer');
var list = [];
var updated;
var addItem;

var connection = mysql.createConnection({

	host: 'localhost',
	user: 'root',
	password: '',
	database: 'biebay'

})


 connection.connect(function(err) {
    if (err) throw err;
    console.log('Manager login');
    start();
    
    function start() {
    inquirer.prompt([
        {
            type: 'list',
            message: 'Choose a Service',
            name: 'manChoice',
            choices: ["View Current Products", "View Low Inventory", "Add Items to Inventory", "Add New Product"]
        }
    //switch statement for four options
    ]).then(function (res) {
        switch (res.manChoice) {
            case 'View Current Products':
                viewProducts();
                break;
            case 'View Low Inventory':
                viewLow();
                break;
            case 'Add Items to Inventory':
                addInv();
                break;
            case 'Add New Product':
                addProduct();
                break;
        }
    });
 
 }
 
 
 function viewProducts() {
			
			connection.query("SELECT `item_id`, `product_name`, `price`, `stock_quantity`, `autographed` FROM `products`", function(err, data) {
				
				if (err) throw err;

				for (var i = 0; i < data.length; i++) {
					
					if(data[i].autographed === 1) {
					
						console.log("ID:",  data[i].item_id, "PRODUCT:", "Autographed", data[i].product_name, "PRICE: $" + data[i].price, "STOCK QUANTITY:", data[i].stock_quantity);

					} else {

						console.log("ID:",  data[i].item_id, "PRODUCT:", data[i].product_name, "PRICE: $" + data[i].price, "STOCK QUANTITY:", data[i].stock_quantity);

					}
				}
				
				ask();
			})
		}

		function viewLow() {
			
			connection.query("SELECT `item_id`, `product_name`, `price`, `stock_quantity`, `autographed` FROM `products` WHERE `stock_quantity` < 12", function(err, data) {

				if (err) throw err;

				for (var i = 0; i < data.length; i++) {

					if(data[i].autographed === 1) {
					
						console.log("ID:",  data[i].item_id, "PRODUCT:", "Autographed", data[i].product_name, "PRICE: $" + data[i].price, "STOCK QUANTITY:", data[i].stock_quantity);

					} else {

						console.log("ID:",  data[i].item_id, "PRODUCT:", data[i].product_name, "PRICE: $" + data[i].price, "STOCK QUANTITY:", data[i].stock_quantity);

					}
				}

				ask();
			})	
		}

		function addInv() {

			connection.query("SELECT `product_name` FROM `products`", function(err, data) {

				for (var i = 0; i < data.length; i++) {

					list.push(data[i].product_name);

				
				}
			
				inquirer.prompt([
						{
							type: 'list',
							message: 'What product would you like to update the inventory on?',
							name: 'updated',
							choices: list
						}
					]).then(function(response) {

						updated = response.updated;

						inquirer.prompt([
								{
									type: 'input',
									message: 'updating amount by',
									name: 'invUp'
								}
							]).then(function(response) {
								connection.query("SELECT `stock_quantity` FROM `products` WHERE `product_name` = ?",[updated], function(err, data) {

									if (err) throw err;

									addItem = Number(data[0].stock_quantity) + Number(response.invUp);
									
									connection.query("UPDATE `products` SET `stock_quantity` = ? WHERE `product_name` = ?", [addItem, updated], function(err, data) {

										if (err) throw err;

										console.log("Stock Updated.");

										ask();
									})
								})
							})
						
					
					})
				
				
			})

		}
 
 

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
            connection.query("INSERT INTO `products` (`product_name`, `department_name`, `price`, `stock_quantity`, `autographed`) VALUES (?,?,?,?,?)", [res.productName, res.departmentName, res.price, res.stockQuantity, res.autograph], function (err, data) {
                if (err) throw err;
                console.log("Added new Product");
            })
        })
}

function ask() {
			inquirer.prompt([
					{
						type: 'list',
						message: 'Run another task?',
						name: 'ask',
						choices: ['Yes', 'No']
					}
				]).then (function(response) {
					
					if (response.ask === 'Yes') {
					
						start();
					
					} else {

						console.log('Finished.');
					}
				})
		}
		
		
});		
		
	