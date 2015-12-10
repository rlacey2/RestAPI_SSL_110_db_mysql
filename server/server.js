// http://thejackalofjavascript.com/architecting-a-restful-node-js-app/

// HTTPS
// http://www.hacksparrow.com/express-js-https.html

var express = require('express');

var toobusy = require('toobusy-js'); 

var mysql = require('mysql'); 
var mysqlLib = require('./nodejs/mysqlLib.js');

var secrets = require('./secret.js'); 

var path = require('path');
var logger = require('morgan');
var bodyParser = require('body-parser');

var fs = require('fs');  // for certs



var https = require('https'); 

// start the server with ssl
 
 
var privateKey   = fs.readFileSync('.\\ssl\\test-key.pem');
var certificate  = fs.readFileSync('.\\ssl\\test-cert.pem');

var credentials = {key: privateKey, cert: certificate};

var host = "localhost"; //  detect this dynamically later
 
var app = express();

 
 
// middleware which blocks requests when we're too busy 
app.use(function(req, res, next) {  // HAS TO BE FIRST 
  if (toobusy()) {
     res.status(503).send("<h1>The server is busy, please try later.</h1>");
  } else {
    next();
  }
});
 
 /*
 // simulate a load for stress testing
app.get('/', function(req, res) {
  // processing the request requires some work! 
  var i = 0;
  while (i < 1e8) i++;                // <------ change to increase load time, e8+ overstress 20151209
  res.send("I counted to " + i);
});
*/

app.use(logger('dev'));
app.use(bodyParser.json());

app.use(
			"/", //the URL throught which you want to access to you static content
			express.static(__dirname + '/_ngClient')  //where your static content is located in your filesystem
				); 

console.log(__dirname + '/_ngClient');

app.all('/*', function(req, res, next) {
    // CORS headers
    res.header("Access-Control-Allow-Origin", "*"); // restrict it to the required domain
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
    // Set custom headers for CORS
		//res.header('Access-Control-Allow-Headers', 'Content-type,Accept,X-Access-Token,X-Key');
    res.header('Access-Control-Allow-Headers', 'Content-type,Accept,X-Access-Token');
    if (req.method == 'OPTIONS') {
        res.status(200).end();
    } else {
        next();
    }
}); 

// Auth Middleware - This will check if the token is valid
// Only the requests that start with /api/v1/* will be checked for the token.
// Any URL's that do not follow the below pattern should be avoided unless you 
// are sure that authentication is not needed

// specific check to allow an owner get something specific to them
//app.all('/api/v1/owner/:id', [require('./middlewares/validateOwnerRequest')]);

//app.all('/api/v1/owner/*', [require('./middlewares/validateRequest')]);
app.all('/api/v1/admin/*', [require('./middlewares/validateRequest').validateRequest]);
app.all('/api/v1/*', [require('./middlewares/validateRequest').validateRequest]);

app.use('/', require('./routes')); // will load/use index.js by default

// If no route is matched by now, it must be a 404
app.use(function(req, res, next) {
    var err = new Error('Route Not Found, are you using the correct http verb / is it defined?');
    err.status = 404;
    next(err);
});



// mysql stuff


if (host ===  'localhost') // the webserver
{
		console.log("mysql stuff");
	// notice the atrtribute name are slightly different in the credentials
	// some of the values are here twice due to attribute inconsistencies
	// each db connection will look for relevant fields
	
	mysqlCreds_clearDB =   secrets.clearDB();
				 
				 // local mysql
	mysqlCredsLocalhost =   secrets.localhost();
	
 
			 //	var dbPool = mysqlLib.initialise(mysqlCreds_clearDB);
				global.dbPool = mysqlLib.initialise(mysqlCredsLocalhost);
			console.log(global.dbPool);
}

 
var server = https.createServer(credentials, app);
var port = 3443;
console.log("listening on port: " + port);
server.listen(3443);


process.on('SIGINT', function() { // https://www.npmjs.com/package/toobusy-js
  server.close();
  // calling .shutdown allows your process to exit normally 
  toobusy.shutdown();
  process.exit();
});