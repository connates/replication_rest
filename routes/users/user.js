/* 
var uuid = require('node-uuid'),
    cache = require('./utilities/cacheHandler'),
    dbCloud = require('./utilities/dbConnection'),
    activity = require('./utilities/activityHandler'),
    errors = require('./common/errorCodes'),
    constants = require('./common/constants'),
    bunyan = require('./utilities/BunyanLogger'),
    tokenGenerator = require('./utilities/TokenGenerator'),
    config = require('./utilities/config');

//Method to login 
exports.login = function (req, res) {
  var email = req.body.email;
  var password = req.body.password;
  var token = req.body.token;
  var oldToken = req.body.oldToken;
  var tokenType = req.body.tokenType;
  var language = req.body.locale ? req.body.locale : errors.defaultLanguage;
  //var appversion = req.body.appversion;

  if (!email || !password) {
    errors.sendErrorResponse(req, res, {errNum:errors.MISSING_INFO_IN_API});
    return;
  }

  var db = dbCloud.getHandle();
  var log = bunyan.getHandle();
  
  validateUser(email, password, token, oldToken, tokenType, language, db, log, req, res);
 
}

exports.logout = function(req, res){
	req.logout();
    res.redirect('/home');
}


function check_auth_user(username,password,done,public_id){
    var sql="SELECT * FROM members WHERE email = '"+ username +"' and password = '"+ password +"' limit 1";
    console.log(sql);
    client.query(sql, function (err,results) {
            if (err) throw err;
            if(results.length > 0){
                var res=results[0]; 
                //serialize the query result save whole data as session in req.user[] array  
                passport.serializeUser(function(res, done) {
                    done(null,res);
                });
 
                passport.deserializeUser(function(id, done) {
                    done(null,res);
 
                });
                //console.log(JSON.stringify(results));
                //console.log(results[0]['member_id']);
                return done(null, res);
            }else{
                return done(null, false); 
            } 
        });
}
*/
