var jwt = require('jwt-simple');
var Q         = require('q');   // promises

var _ = require('lodash');

 var mysql = require('mysql'); 
 var mysqlLib = require('../nodejs/mysqlLib.js');


var user = require('./users.js');  

var auth = {
        login: function(req, res) {

console.log("need to store the token in db, if going to invalidate/recall later"); //		
	
            var username = req.body.username || '';
            var password = req.body.password || '';
            if (username == '' || password == '') {
                res.status(401);
                res.json({
                    "status": 401,
                    "message": "Invalid credentials"
                });
                return;
            }
            // Fire a deferred query to your DB and check if the credentials are valid
						var defered = Q.defer();

						defered =  user.validate(username, password)  ;

						defered.promise.then(function(useObject) 
												 { // then
			   // If authentication is success, we will generate a token
         // and dispatch it to the client
														res.json(genToken(useObject));				
												 },
													function(error)  
												 {
  	                      // might need a if/else here in case its network related
											 // If authentication fails, we send a 401 back
																	res.status(401);
																	res.json({
																			"status": 401,
																			"message": "Invalid credentials"
																	});
																	return;		
												 });								
        },
				validateUser: function(username) {
					  useObject  =  user.validateUser(username);
						
						console.log(useObject);
						return useObject;
					 
				},
				
 							
				// not used yet, calling code would need to be coded to handle promise, and so would this code
        validateUserAsych: function(username) { // check if a username exists and return the user object
		     // can/should only be called with a username, so not check to see if empty need
						var defered = Q.defer();

						defered =  user.validateUser(username)  ;

						defered.promise.then(function(useObject) 
												 { // then
			   // If authentication is success, we will generate a token
         // and dispatch it to the client
								 res.json(genToken(useObject));				
												 },
													function(error)  
												 {
  	                      // might need a if/else here in case its network related
											 // If authentication fails, we send a 401 back
																	res.status(401);
																	res.json({
																			"status": 401,
																			"message": "Invalid credentials"
																	});
																	return;		
												 });							 
        },
    }
    // private methods
function genToken(user) {
    var expires = expiresIn(7); // 7 days
 
		// 2nd parameter is the token, user object is inside this token
    var token = jwt.encode({
        exp: expires,
				user: user                // added for better security
    }, require('../config/secret')());
		
    return {
        token: token,
        expires: expires,
        user: user
    };
}

function expiresIn(numDays) {
    var dateObj = new Date();
    return dateObj.setDate(dateObj.getDate() + numDays);
}

_.mixin({
	// http://stackoverflow.com/questions/17251764/lodash-filter-collection-using-array-of-values
	// moved to this
	//http://jsfiddle.net/plantface/rw6jdkpg/
	
	//returns an array, so if expecting one match take [0]
	
    'filterByValues': function (collection, key, values) {
        return _.filter(collection, function (o) {
            return _.contains(values, resolveKey(o, key));
        });
    }
});

function resolveKey(obj, key) {
    if (obj == null || key == null) {
        return undefined;
    }
    var resolved = undefined;
    if (typeof key == 'function') {
        resolved = key(obj);
    } else if (typeof key == 'string') {
        resolved = obj[key];
        if (resolved == null && key.indexOf(".") != -1) {
            resolved = _.deepGet(obj, key);
        }
    }
    return resolved;
}

module.exports = auth;