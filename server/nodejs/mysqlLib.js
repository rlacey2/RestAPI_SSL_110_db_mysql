// mysqlLib.js.js
// ========

var mysql = require("mysql"); // http://www.w3resource.com/node.js/nodejs-mysql.php

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

module.exports = { 
	
	// reconnecting http://stackoverflow.com/questions/20210522/nodejs-mysql-error-connection-lost-the-server-closed-the-connection
	
	
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
							}
 
 
};









