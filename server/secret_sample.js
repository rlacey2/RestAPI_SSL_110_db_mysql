// this file is the same syntax as the missing secret.js file
// change your connection and creditential details as required

// the attribute names are not consistent across clearDB virtual hosting and localhost mysql
// hence some of the attributes are aliases with the same value to prevent an error
// 


// store passwords here that you do not want deployed to remote system.

// return each secret as a function so that in can be replaced by third party 

// get this values from your setup

	mysqlCreds_clearDB =  {
            "jdbcUrl": "jdbc:mysql://someserver-address.cleardb.net/aaaaaaaaaaaaaaaa?user=xxxxxxxxxxxxxxxx&password=ppppppppp",
            "uri": "mysql://xxxxxxxxxxxxxxxx:ppppppppp@someserver-address.cleardb.net:3306/aaaaaaaaaaaaaaaa?reconnect=true",
            "name":     "aaaaaaaaaaaaaaaa",
						"database": "aaaaaaaaaaaaaaaa",
            "hostname": "someserver-address.cleardb.net",
						"host":     "someserver-address.cleardb.net",
            "username": "",
						"user":     "xxxxxxxxxxxxxxxx",
            "password": "ppppppppp",
						 multipleStatements: true,
						 debug    :  false,
						 connectionLimit : 8, //important
						 // supportBigNumbers: true
         }
				 
				 // local mysql
	mysqlCredsLocalhost =  {
	          connectionLimit : 100, //important
						host: "127.0.0.1" ,
						hostname: "127.0.0.1", // added for console logging
	
						port:  3306,
            "username": "xxxxxxxxxxxxxxxx",
						"user":     "xxxxxxxxxxxxxxxx",
            "password": "ppppppppp",
						database: mysqlCreds_clearDB.name,  // nb using same name both hosts
						multipleStatements: true,
						debug    :  false 
         }		





var secret = {
	
    clearDB : function() { return mysqlCreds_clearDB;} ,
		
		localhost : function() { return mysqlCredsLocalhost;} 
	
};


module.exports = secret;