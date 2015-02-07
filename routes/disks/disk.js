var dbConnection = require('./../utilities/dbconnect');
var queryString = 'SELECT * FROM disk';

var connection = dbConnection.getDbConnection();

exports.getDisks = function(req, res) {
	connection.query(queryString, function(err, rows, fields) {
		if (err)
			throw err;

		/*for ( var i in rows) {
			console.log('Disk Name: ', rows[i].name);
		}*/
		res.jsonp(rows);
	});
};

exports.configReplication= function(req, res) {
	connection.query(queryString, function(err, rows, fields) {
        
        console.log("=========Inside config replication======"+req);
		if (err)
			throw err;

		/*for ( var i in rows) {
			console.log('Disk Name: ', rows[i].name);
		}*/
		res.jsonp(rows);
	});
};