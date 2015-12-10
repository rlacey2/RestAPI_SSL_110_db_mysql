 // http://docs.sequelizejs.com/en/latest/docs/scopes/
 var _ = require('lodash');
 var Q         = require('q');   // promises
 var mysql = require('mysql'); 
 var mysqlLib = require('../nodejs/mysqlLib.js');
 
 //    THINK ASYNCH 

var users = {
	
    getAll2: function( ) {
        return  data; // Spoof a DB call
        
    },	 
		
		
		// all below here are returning json on the response stream
		
		
		getAccountSettings :  function(req, res) {
			 // should only return to an admin or the owner of the id
			 
			 // not happy having to do the authorisation here
			console.log("getAccountSettings idRequested " + req.idRequested);
			console.log("getAccountSettings userRequesting  " + req.userRequesting.id);
			
			// this is to prevent a hack of the id by another user to the endpoint
			
			// not entirely happy placing this authorisation here, we must check if the request
			// is from an admin or the the owner of the data.
			// the decoded session token has been used to validate the user i.e. the username was encryped.
			// We are only at this point with an authenicated request
			// now check the privileges of the user to the data
			
			if ((req.userRequesting.role == "admin") || (req.idRequested == req.userRequesting.id))
			{ // allow data access
        var id = req.params.id;
				var filter = [{ "id"   : id} ];
				var sql2 = "SELECT  id,  username,  role  FROM users  ";
				
				var sql = mysqlLib.applySQLFilters(sql2,filter);
				
				mysqlLib.executeSQL(sql,  function ( error, results  )  {
							if (error) return res.json(error);
									res.json(  results  );
						}   );
			}
			else
			{
										res.status(403);
											res.json({
													"status": 403,
													"message": "Not Authorized"
											});
											return;				
			}
    },
		
		
		
	
    getAll: function(req, res) { // nb all fields returned
			
							var filter = null;
							var sql = "SELECT  id,  username,  role, enabled  FROM users  ";
							mysqlLib.executeSQL(sql,  function ( error, results  )  {
							if (error) return res.json(error);
									res.json(  results  );
						} );
    },
		
		//[{ "id"   : 3}, { "name" : "'rlacey3'"}] 
    getOne: function(req, res) {
			console.log("getOne = " + req.params.id);
        var id = req.params.id;
				var filter = [{ "id"   : id} ];
				var sql2 = "SELECT  id,  username,  role, enabled  FROM users  ";
				
				var sql = mysqlLib.applySQLFilters(sql2,filter);
				
				mysqlLib.executeSQL(sql,  function ( error, results  )  {
							if (error) return res.json(error);
									res.json(  results  );
						}   );				
 		
    },
    create: function(req, res) {
        var nUser = req.body;
				console.log(nUser);
				// id field is left out
				
				var timeStamp = new Date().toISOString().slice(0, 19).replace('T', ' ');
				
				var sql = "INSERT INTO `ad_b30e7fb32053c27`.`users` ( `createdAt`, `updatedAt`, `active`, `username`, `name`, `salt`, `password`,  `role`, `revokeToken`, `enabled`, `timeout`) "
        sql = sql  + " VALUES (  ";

				sql = sql  + " '" + timeStamp + "', " ;
				sql = sql  + " '" + timeStamp + "', " ;
				
				sql = sql  +   '-1' + ", " 
				sql = sql  + " '" + nUser.username + "' , " ;
				sql = sql  + " '" + nUser.name + "' , " ;
        sql = sql  + " '" + nUser.salt + "' , " ;
				sql = sql  + " '" + nUser.password + "' , " ;
				sql = sql  + " '" + nUser.role + "' , "; 
				sql = sql  + " 0, " ;    // revokeToken
				sql = sql  + " -1, ";   // enabled
				sql = sql  + " -1   )";   // timeout
				
				mysqlLib.executeSQL(sql,  function ( error, results  )  {
							if (error) return res.json(error);
									res.json(  results  );
				} );
				
				 
				
       // data.push(newuser); // Spoof a DB call
        //res.json(newuser);
    },
    update: function(req, res) {
        var updateuser = req.body;
        var id = req.params.id;
        data[id] = updateuser // Spoof a DB call
        res.json(updateuser);
    },
    delete: function(req, res) {
        var id = req.params.id;
				
        //data.splice(id, 1) // Spoof a DB call
        //res.json(true);
				
        var id = req.params.id;
				var filter = [{ "id"   : id} ];
				var sql2 = "delete FROM users  ";
				
				var sql = mysqlLib.applySQLFilters(sql2,filter);
				
				mysqlLib.executeSQL(sql,  function ( error, results  )  {
							if (error) return res.json(error);
									res.json(  results  );
						}   );					
				
				
				
    },
		
	    getList: function(req, res) {
        var allusers = data; // Spoof a DB call
				
				var filteredFields = _.map(allusers,function(user,index)
				{
					 return { "username" : user.username, "role" : user.role};
				});
				
				
        res.json(filteredFields);
    },	
		
		
		
				//[{ "id"   : 3}, { "name" : "'rlacey3'"}] 
    validate: function(username, password) {  //2 parameters
			
				var params  = [{ "username": username}, { "password": password}, { "enabled": -1}];  // notice this is an array of hashes			
				var sql = "SELECT  id, name, username,  role, enabled, timeout  FROM users  where ? and ? and ?";			
				var defered = Q.defer();  // outer promise returned to caller
				var defered2 = Q.defer(); // inner promise to get get result from deeper call
		 
				defered2 = mysqlLib.executeSQLAsynch(sql,params);
				
			  defered2.promise.then(function(results) { // business decision below, to filter data callee is getting
             // a success here could mean a zero result on the dataset

             if (results.length > 0 )
						 {
							var userObj = {
											"name": results[0].name,
											"username": results[0].username,
											"role" : results[0].role,
											"id": results[0].id,
											"enabled": results[0].enabled,
											"timeout" : results[0].timeout 
									};
						//	return userObj;
						 	defered.resolve(userObj);
						}
						else
						{
							defered.reject("rejected credentials");
						}
					},
					function(error) {
console.log("bbbbbbb");
									defered.reject(error);
					});
 
				 return defered;    // let the caller wait asych for the resolving of the promise
 		
    }, //validate
		
		
		  // not used and any callers would need to handle promises
			validateUserAsynch: function(username ) {  // 1 parameter, used in route checking from the token for authorisation
			
		
				var params  = [{ "username": username}, { "enabled": -1}  ];  // notice this is an array of hashes			
				var sql = "SELECT  id, name, username,  role, enabled, timeout  FROM users  where ? and ?";			
				var defered  = Q.defer();  // outer promise returned to caller
				var defered2 = Q.defer(); // inner promise to get get result from deeper call
		 
				defered2 = mysqlLib.executeSQLAsynch(sql,params);
				
			  defered2.promise.then(function(results) { // business decision below, to filter data callee is getting
 
	            if (results.length > 0 )
						 {
											var userObj = {
						 
																	"username": results[0].username,
																	"role" : results[0].role,
						 
															};
													defered.resolve(userObj);
												}
						else
						{
							defered.reject("rejected credentials");
						}						
							
					},
					function(error) {
 
									defered.reject(error);
					});
 
				 return defered;    // let the caller wait asych for the resolving of the promise
 		
    }, //validateUserAsynch
		
		  // blocking call
	    validateUser: function(username ) {  // 1 parameter, used in route checking from the token for authorisation
			
			
				var params  = [{ "username": username}, { "enabled": -1}  ];  // notice this is an array of hashes			
				var sql = "SELECT  id, name, username,  role, enabled, timeout  FROM users  where ? and ?";			
				
				var callback =  function ( error, results  )  {
													if (error) return null;
													// success
													console.log("$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$");
													var userObj = {															 
																	"username": results[0].username,
																	"role" : results[0].role,
															};
															
															console.log(userObj);
					                return userObj;
												};
				
				
				mysqlLib.executeSQLParameters(sql,params, callback);
 		 
    } //validateUser	
};
 
module.exports = users;