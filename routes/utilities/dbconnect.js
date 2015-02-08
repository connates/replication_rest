var mysql = require('mysql');

var ebdrdbcConnection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '957592',
    database: 'ebdrdbc'
});

var ebdrdbsConnection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '957592',
    database: 'ebdrdbs'
});

var configdbConnection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '957592',
    database: 'configdb'
});

exports.connectEbdrdbc = function () {
    ebdrdbcConnection.connect(function (err) {
        if (err) {
            console.error('error connecting: ' + err.stack);
            return;
        }
        console.log('connected to [ebdrdbc] as id ' + ebdrdbcConnection.threadId);
    });
};

exports.connectEbdrdbs = function () {
    ebdrdbsConnection.connect(function (err) {
        if (err) {
            console.error('error connecting: ' + err.stack);
            return;
        }
        console.log('connected to [ebdrdbs] as id ' + ebdrdbsConnection.threadId);
    });
};

exports.connectConfigDB = function () {
    configdbConnection.connect(function (err) {
        if (err) {
            console.error('error connecting: ' + err.stack);
            return;
        }
        console.log('connected to [configdb] as id ' + configdbConnection.threadId);
    });
};

exports.getEbdrdbcConnection = function () {
    return ebdrdbcConnection;
};

exports.getEbdrdbsConnection = function () {
    return ebdrdbsConnection;
};

exports.getConfigdbConnection = function () {
    return configdbConnection;
};