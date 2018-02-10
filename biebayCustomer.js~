var mysql = require('mysql');

var inquirer = require('inquirer');

var inventory = [];
var idChosen;
var amountChosen;
var transfer;
var total;


var connection = mysql.createConnection({

	host: 'localhost',
	user: 'root',
	password: '',
	database: 'biebay'

})


connection.connect(function(err) {
	if (err) throw err;
	console.log("-----------------------------");	
	console.log("Connected to Bieber Emporium!");
	console.log("-----------------------------");
	
	startEmporium();
	



//Listing items and starting emporium.
function startEmporium() {
		connection.query("SELECT `item_id`, `product_name`, `price` FROM `products`", function(err, data) {
			if (err) throw err;
			for (var i = 0; i < data.length; i++) {
				inventory.push(data[i]);
				console.log("id", inventory[i].item_id + ":", inventory[i].product_name, "$" + inventory[i].price);


					}
					
					inquirer.prompt([
			{
				type: 'input',
				message: 'Which item would you like to purchase? (by item id number)',
				name: 'itemChoice'
			}
		//Show Chosen Item or Devote error
		]).then(function (response) {
			idChosen = response.itemChoice;
			connection.query("SELECT `item_id`, `product_name`, `price`, `stock_quantity` FROM `products` WHERE `item_id` = ?", [idChosen], function(err, data) {
					if (idChosen > inventory.length) {
						console.log('\nNot a real ID, please enter one from the list\n');
					}
					else {
						console.log("You chose item", data[0].product_name, "for $" + data[0].price);
						findAmount();
					}

				//Ask for amount
				function findAmount () {
					inquirer.prompt ([
						{
							type: 'input',
							message: 'How many ' + data[0].product_name + '\'s would you like?',
							name: 'quantity'
						}
					//Limited Amount/Insufficient
					]).then(function (response) {
						amountChosen = response.quantity;
						 if (data[0].stock_quantity > amountChosen) {
						 	total = data[0].price * amountChosen;
						 	transfer = data[0].stock_quantity - amountChosen;

						 	console.log("total due: $" + total);
						 	connection.query("UPDATE `products` SET `stock_quantity` = ?  WHERE `item_id` = ?", [transfer, idChosen])
						 				inquirer.prompt([
													{
														type: 'list',
														message: 'Continue Shopping?',
														name: 'return',
														choices: ['Yes', 'No']
													}
											]).then(function(response) {

													if (response.return === "Yes") {

														startEmporium();

														total++;
													
													} else {

														console.log("Payment Necessary.");
													}
											})
						 }
						 else {
						 	console.log("Exceeds Inventory limit.");
						 	console.log("There are", data[0].stock_quantity, "in stock");
						 	console.log("Please choose a different amount");
						 	findAmount();
						 }
					}) 
				}
			})
		})
					
					
					
					
					
				}
			
			)}




















	
})


