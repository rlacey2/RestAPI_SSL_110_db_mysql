# RestAPI_SSL_110_db_mysql

RestAPI to resources - angular, express, node, SSL

based on: 

http://thejackalofjavascript.com/architecting-a-restful-node-js-app/

with updates as in comments to remove security flaws in auth.js in the server folder

HTTPS implmented rather than HTTP, 

Follow the steps from:
http://www.hacksparrow.com/express-js-https.html



This is an improvement on    *_SSL_105_db by adding mysql support and supplying users from that database.

You will need mysql for this either use a localhost setup or a service provider such as clearDB.

The same database name created at localhost and in the cloud will make switch easier.
The credentials for both options are stored in secrets.js



The file secrets.js which will not be in the repo will store relevant passwords etc. Yo can replace the use of the
secrets.js functions with your own passwords.


users.js will now read data from the mysql database.







