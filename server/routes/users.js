// http://docs.sequelizejs.com/en/latest/docs/scopes/
 var _ = require('lodash');
 
 var mysql = require('mysql'); 
 var mysqlLib = require('../nodejs/mysqlLib.js');
 
 
 function applySQLFilters(sql,   filters)
 {
	  
	 	if (filters) // build up the where clause
				{
					var filterStr = "";
					for( var i=0, l=filters.length; i<l; i++ ) {
							console.log( filters[i] );
							 for (var p in filters[i] ) {
											console.log(p + ': ' + filters[i][p]);
											if (filterStr.length > 0 ) filterStr = filterStr + " and ";
											filterStr = filterStr  + " " + p + " = " +  filters[i][p];
									}
					}
					sql = sql + " where " + filterStr;
					console.log(filterStr);
				}
		return sql;		
 }
 
 
 
 function executeSQL(  sql,   cback  ) { // cback is the error / success for the mysql, error is first parameter
 /*
	var filterStr = "";
	var filters = ifilters || null;
	// var filters =  [{"field" : "headerId", "value" : 1}, {"field" : "detailId", "value" : 1}]
  // var filters =  [{ "id"   : 3}, { "name" : "'rlacey3'"}]  notice inner quotes on strings
	
	
	if (filters) // build up the where clause
	{
		for( var i=0, l=filters.length; i<l; i++ ) {
				console.log( filters[i] );
				 for (var p in filters[i] ) {
								console.log(p + ': ' + filters[i][p]);
								if (filterStr.length > 0 ) filterStr = filterStr + " and ";
								filterStr = filterStr  + " " + p + " = " +  filters[i][p];
						}
		}
		sql = sql + " where " + filterStr;
		console.log(filterStr);
	}
	*/
	
		console.log(sql);
  global.dbPool.query(sql, function (err, result) { // order here is err, result
    if (err) return cback(null, err);
    cback(result , null );
  });
}
 
 
 
 
 
 
 

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
				
				var sql = applySQLFilters(sql2,filter);
				
				executeSQL(sql,  function ( error, posts  )  {
							if (error) return res.json(error);
									res.json(  posts  );
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
							executeSQL(sql,  function ( error, posts  )  {
							if (error) return res.json(error);
									res.json(  posts  );
						} );
    },
		
		//[{ "id"   : 3}, { "name" : "'rlacey3'"}] 
    getOne: function(req, res) {
			console.log("getOne = " + req.params.id);
        var id = req.params.id;
				var filter = [{ "id"   : id} ];
				var sql2 = "SELECT  id,  username,  role, enabled  FROM users  ";
				
				var sql = applySQLFilters(sql2,filter);
				
				executeSQL(sql,  function ( error, posts  )  {
							if (error) return res.json(error);
									res.json(  posts  );
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
				
				executeSQL(sql,  function ( error, posts  )  {
							if (error) return res.json(error);
									res.json(  posts  );
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
				
				var sql = applySQLFilters(sql2,filter);
				
				executeSQL(sql,  function ( error, posts  )  {
							if (error) return res.json(error);
									res.json(  posts  );
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
		
		
};
var data = [  
{
    "name": "rlacey1",
		"username": "rlacey1@example.com",
		"password" : "pass1",  // hash and salt
		"salt" : "sfsdfsjfdfdffhketcwetc",
		"token" : "",
		"role" : "user",
    "id": "1",
		"revokeToken" : false,
		"enabled": true,
		"timeout" : -1,
},  
{
    "name": "rlacey2",
		"username": "rlacey2@example.com",
		"password" : "pass2",  // hash and salt
		"salt" : "sfsdfsjfhketcwetc",
		"token" : "",
		"role" : "admin",
    "id": "2",
		"revokeToken" : false,
		"enabled": true,
		"timeout" : -1,
}
,  
{
    "name": "rlacey3",
		"username": "rlacey3@example.com",
		"password" : "pass3",  // hash and salt
		"salt" : "sfsdfsjfhketcwetc",
		"token" : "",
		"role" : "user",
    "id": "3",
		"revokeToken" : true,
		"enabled": false,
		"timeout" : -1,
},

{
    "name": "rlacey4",
		"username": "rlacey4@example.com",
		"password" : "pass4",  // hash and salt
		"salt" : "sfsdfsjfhketcwetc",
		"token" : "",
		"role" : "user",
    "id": "4",
		"revokeToken" : true,
		"enabled": true,
		"timeout" : -1,
}




];
module.exports = users;