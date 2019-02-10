let mysql = require('mysql'); 

let connection = mysql.createConnection({
	host : 'localhost',
	user : 'root',
	passsword : '',
	database : 'cars'
});

connection.connect();

module.exports = connection;