var express = require('express'),
bodyParser = require('body-parser'),
passport = require('passport'),
//LocalStrategy = require('passport-local').Strategy,
disks = require('./routes/disks/disk.js'),
replicationConfig = require('./routes/data-replication/replication.configure.js');    
users = require('./routes/users/user'),
dbConnection = require('./routes/utilities/dbconnect.js'), 
authentication = require('./routes/security/authentication'), 
os = require('os'), 
cluster = require('cluster');

dbConnection.connectEbdrdbc(function(err) {
	if (err) {
		console.log("Threre is some error while connecting to DB");
	} else {
		console.log("Connection establised successfully");
	}
});

dbConnection.connectEbdrdbs(function(err) {
	if (err) {
		console.log("Threre is some error while connecting to DB");
	} else {
		console.log("Connection establised successfully");
	}
});

dbConnection.connectConfigDB(function(err) {
	if (err) {
		console.log("Threre is some error while connecting to DB");
	} else {
		console.log("Connection establised successfully");
	}
});


// Handle uncaught exception
process.on('uncaughtException', function(err) {
	console.error((new Date).toUTCString() + ' uncaughtException:',err.message);
	console.error(err.stack);
	process.exit(1);
});

var app = express();
app.use(bodyParser.urlencoded({
	extended : false
}));

// parse application/json
app.use(bodyParser.json());
// Use the passport package in our application
//app.use(passport.initialize());
//app.use(passport.session());

app.all('*', function(req, res, next) {
	res.header('Access-Control-Allow-Origin', '*');
	res.header('Access-Control-Allow-Methods',
			'PUT, GET, POST, DELETE, OPTIONS');
	res.header('Access-Control-Allow-Headers', 'Content-Type');
	next();
});

/*
passport.use(new LocalStrategy(
	function(username, password, done) {
		return check_auth_user(username,password,done);
	}
	));


app.get('/logout', function(req, res){
 
    req.logout();
    res.redirect('/home');
});
*/

//app.use('/',authentication.checkSessionValid);
//disk APIS
app.get('/disk', disks.getDisks);
app.post('/disk', disks.configReplication);

app.post('/replicaiton-config',replicationConfig.configReplication);

/*
app.post('/disk',disks.createdisk);
app.post('/user/signup',disks.createSignup);

app.put('/user/:id',disks.updatedisk);
app.delete('/user/:id',disks.deletedisk);*/
//app.post('/user/login',user.login);
// user login APIS
// app.get('/user', users.findAll);
// app.post('/user',users.createUser);
// app.put('/user/:id',users.updateUser);
// app.delete('/user/:id',users.deleteUser);
//create the http server and run it ton port 3000
app.listen(3000);
console.log('Listening on port 3000...');