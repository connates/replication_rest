var dbConnection = require('./../utilities/dbconnect');
var queryString = 'SELECT * FROM disks';

var connection = dbConnection.getDbConnection();

exports.getDisks = function(req, res) {
	connection.query(queryString, function(err, rows, fields) {
		if (err)
			throw err;

		for ( var i in rows) {
			console.log('Disk Name: ', rows[i].diskName);
		}
		res.jsonp(rows);
	});
};