// Module Dependencies
var url = require('url');
	
var errors =[{'EXPIRED_SESSION_MESSAG':1000,'EXPIRED_SESSION_MESSAGE':1001,'UNEXPECTED_ERROR_MESSAGE':1003}];

/*
 * This method is called from express.js middleware such that before executing 
 * any API this method checks whether "x-session-id" entry is there in request header and 
 * the user session is still valid i.e. "users:x-session-id" value is there in redis cache.
 * If yes the it allows the call to EXECUTE rest API else it throws un-authorized (http code 401) or 
 * missing session info in header (http code 400) error to UI as appropriate.
 * */
exports.checkSessionValid = function(req, res, next) {
  var url_parts = url.parse(req.url, true);
  var path = url_parts.pathname.toLowerCase();
 
  // We do not want to force session check for login/createuser REST API's as user wont be logged in then
  	if (path.indexOf("/user/login") == -1 && path.indexOf("/user/signup") == -1) {
	  // read "x-session-id" from request header
	  var sessionId = req.get("x-session-id");
	  
	  	if(sessionId) {
		  // Build redis key i.e. "users:sessionId"
	      var keyVal = "users:" + sessionId;
	      
	      // Get the value of this key from redis cache
	      cache.get(keyVal, function(err, result) {
	    	if(err) {
	    		  res.status(500).send(errors.UNEXPECTED_ERROR_MESSAGE);
	    	}else if (result != null && result != "") {
	    		  req.sessionInfo = JSON.parse(result);
	    		  cache.setExpiry(keyVal);
	    		  next();
	    	} else {
	    	  		res.status(401).send(errors.EXPIRED_SESSION_MESSAGE);
	    	}
	      });
	  	} else {
	  	  res.status(400).send(errors.MISSING_SESSION_MESSAGE);
	  	}
  	} 
  	else {
	  next();
  	}
}