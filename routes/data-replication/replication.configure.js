var dbConnection = require('./../utilities/dbconnect');
var queryString = 'SELECT * FROM replication_config';

var insertReplicationConfig = "insert into replication_config set ?";

var connection = dbConnection.getConfigdbConnection();

exports.getReplicationConfig = function (req, res) {
    connection.query(queryString, function (err, rows, fields) {
        if (err)
            throw err;

        res.jsonp(rows);
    });
};

exports.configReplication = function (req, res) {
    var query = connection.query(insertReplicationConfig, req.body, function (err, result) {
        if (err) {
            console.log("error:" + err);
        } else {
            res.jsonp(result);
        }
    });
    console.log(query.sql);
};