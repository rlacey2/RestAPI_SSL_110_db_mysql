var jwt = require('jwt-simple');
var user = require('../routes/users.js');  
var Q         = require('q');   // promises
var validateUser = require('../routes/auth').validateUserAsynch;   // <- changed method and below

// this file has been modified since 101, it is now returning a hash of function(s) 
// hence the requires in server.js require the checkout method to be explicit

var validateRequest =  {
  
			 validateRequest : function(req, res, next) {
		
		// this function appears to be called before router.params() hence extra attributes not available
		
			// When performing a cross domain request, you will receive
			// a preflighted request first. This is to check if our the app
			// is safe. 
			// We skip the token outh for [OPTIONS] requests.
			//if(req.method == 'OPTIONS') next();
			
			
			console.log("req.url = " + req.url);
			console.log(req.params);

			var token = (req.body && req.body.access_token) || (req.query && req.query.access_token) || req.headers['x-access-token'];
	 
		 // var key = (req.body && req.body.x_key) || (req.query && req.query.x_key) || req.headers['x-key'];
			
	console.log("********* validateRequests *******");	
	console.log("check if the token has been revoked LATER");		
	
	 
			if (token) {	// key is now encoded in token	and is decoded.user.name below	
					try {
					 
							
							var decoded = jwt.decode(token, require('../config/secret.js')());
							console.log("decoded username = " + decoded.user.username);
	
											
							if (decoded.exp <= Date.now()) {
									res.status(400);
									res.json({
											"status": 400,
											"message": "Token Expired"
									});
									return; 
							}
							
							// Authorize the user to see if s/he can access our resources
							// ASYNCH
		 		
 				
						var defered = Q.defer();
 
						defered =  user.validateUserAsynch(decoded.user.username)  ;
 
						defered.promise.then(function(dbUser) 
								{ // then => user is validated
 
												  var params_id =  req.id  ||  -1 ; // used on owner routes 
													var isAdminRoute = req.url.indexOf('admin') >= 0 ? true : false;

													console.log("params_id    = " + params_id);
													console.log("admin route  = " + isAdminRoute);
											 
													console.log("route        = " + req.url);
													console.log("role         = " + dbUser.role);
														//  if ((isAdminRoute && dbUser.role == 'admin') ||		
														if (( dbUser.role == 'admin' ) ||  // admins are allowed on every authenticated route
																		
																		( ! isAdminRoute  && req.url.indexOf('/api/v1/') >= 0))
														{ //req.url.indexOf('/api/v1/') >= 0 has to be true if in this file

																// append decode information into the request for the next stage (if needed see usersgetAccountSettings
																req.userRequesting  =  dbUser; // pass this on for later validation if needed
																
																next(); // To move to next middleware
														} else {
																	
																res.status(403);
																res.json({
																		"status": 403,
																		"message": "Not Authorized"
																});
																return;
														}							
	 
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
							
 						
						//	return;
								

					} catch (err) {
							res.status(500);
							res.json({
									"status": 500,
									"message": "Oops something went wrong",
									"error": err
							});
					}
			} else {
					res.status(401);
					res.json({
							"status": 401,
							"message": "Invalid Token or Key"
					});
					return;
			}
	}  
}


 
module.exports = validateRequest;