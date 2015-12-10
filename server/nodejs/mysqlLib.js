// mysqlLib.js.js
// ========

var mysql = require("mysql"); // http://www.w3resource.com/node.js/nodejs-mysql.php
var Q         = require('q');   // promises
var pool = null;
//var pool = mysql.createPool(/* credentials go here */);
/*
exports.getConnection = function(callback) {
  pool.getConnection(function(err, conn) {
    if(err) {
      return callback(err);
    }
    callback(err, conn);
  });
};

*/

var mysqlLib =  { 
	
	// reconnecting http://stackoverflow.com/questions/20210522/nodejs-mysql-error-connection-lost-the-server-closed-the-connection
	
	  connectionListener : false,    // flag to prevent warnings after 10 calls
		
		
	initialise : function(credentials)
	{
		//console.log(credentials);
    // need error handling here in case db not available to report back?
		if (!pool)
		{
			console.log("connection to: " +  credentials.hostname);
			pool = mysql.createPool(credentials);
			console.log("myslLib initialised: connection limit = " + credentials.connectionLimit);	     
		}
		 
		return pool;
	},
 
	 getConnection : function(callback) {
												pool.getConnection( function(err, conn) {
													if(err) {
														return callback(err);
													}
													callback(err, conn);
												});
											},
 
     
    queryAsynch :  function  (connection, sql, parameters) { // http://stackoverflow.com/questions/28432401/replacing-callbacks-with-promises-in-node-js
	
								return new Promise(function (resolve, reject) {
									connection.query(sql, parameters, function (err, result) {
										//  Fail fast! Handle errors first, then move to the business end
										if (err) {
											// Reject the Promise with an error
											console.log("reject(err)");
											return reject(err)
										}

										// Resolve (or fulfill) the promise with data
										console.log("record id = " + result.insertId)   ;
										
										return resolve(result)
									})
								})
							},
							
							
							
	 applySQLFilters : function (sql,   filters)
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
 },
 
 
				 sanitize : function(input)
				 {
					 global.dbPool.connection.escape(key)
				 },
				 
				 
				 executeSQL : function (  sql,   cback  ) { // cback is the error / success for the mysql, error is first parameter
					
					console.log(sql);
					global.dbPool.query(sql, function (err, result) { // order here is err, result
						if (err) return cback(  err, null);
						cback(  null , result );
					}) 
				},
										
											
				 executeSQLParameters : function (  sql, Parameters,  cback  ) { // cback is the error / success for the mysql, error is first parameter
					
					console.log(sql);
					global.dbPool.query(sql, Parameters, function (err, result) { // order here is err, result
					//console.log(err);
					 console.log(result);
						if (err) return cback(  err, null);
						cback(  null , result );
					}) 
				},

				
				//  ************************

				executeSQLAsynch : function (sql, parameters) {
					
					// cannot make any business decisions here, simple execute the sql request and return success/failure
				 
					 // using ? helps prevent injection attacks
				 
				 var defered = Q.defer();
			// testing	 
			//	 defered.resolve({"code" : 100, "status" : "Error in getting pool connection from database, no data saved"});
			//	 return defered.promise;
				 

				  mysqlLib.getConnection(function(err,connection,fields){
 			 
						if (err) {
											console.log(err);
											connection.release();
											defered.reject (  {"code" : 100, "status" : "Error in getting pool connection from database, no data saved"});				 
										}  
										
						// we have a connection
 
		 			 
						if (mysqlLib.connectionListener == false) // once only, is this the best way to code this
										{ // we get a memory leak error after 10 hits
											mysqlLib.connectionListener = true;
											connection.on('error', function(err) { // a listener      
														defered.reject ( {"code" : 100, "status" : "Error in ongoing connection to database. Data state may not be consistent."});
											});			
										};		
	 
													connection.query(sql, parameters, function (err, result) {
														//  Fail fast! Handle errors first, then move to the business end
														
														 connection.release(); // need to copy relevant results before releasing
														
														if (err) {
															// Reject the Promise with an error
															console.log("reject(err)");
														//	return defered.reject(JSON.parse(JSON.stringify(err)));
															return defered.reject(  err );
														}

														// Resolve (or fulfill) the promise with data
									          		
													//	console.log(result);	
											// return defered.resolve(JSON.parse(JSON.stringify(result)));
														return defered.resolve( result  );
													})
						//						});
 
							}); // mysqlLib.getConnection			
							
							// outside the pooling as that is asynch
							return defered; // .promise is in the receiver
				 
				} //  executeSQLAsynch 						
							
							
							
							
 
 
};






module.exports = mysqlLib;


