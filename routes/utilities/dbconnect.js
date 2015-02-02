var mysql = require('mysql');

var connection = mysql.createConnection({
	host : 'localhost',
	user : 'root',
	password : '957592',
	database : 'ebdrdbc',
});

exports.connectDB = function() {
	connection.connect(function(err) {
		if (err) {
			console.error('error connecting: ' + err.stack);
			return;
		}
		console.log('connected as id ' + connection.threadId);
	});
};

exports.getDbConnection = function() {
 return connection;
};

