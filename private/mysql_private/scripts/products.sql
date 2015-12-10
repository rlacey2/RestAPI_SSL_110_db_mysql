
-- 2015 database for secure login model using php 
-- use lowercase table names 
-- unbuntu is case sensitive
-- see Identifier Case Sensitivity  http://dev.mysql.com/doc/refman/5.0/en/identifier-case-sensitivity.html


-- DROP DATABASE IF EXISTS jmb01;  
-- CREATE DATABASE  jmb01;

-- use jmb01;
use ad_b30e7fb32053c27;

-- need implement referential integrity across the tables

-- As of MySQL 5.7.8, MySQL supports a native JSON data type http://dev.mysql.com/doc/refman/5.7/en/json.html


DROP TABLE IF EXISTS  products;
CREATE TABLE products (
    id   INT NOT NULL AUTO_INCREMENT,
		createdAt    DATETIME, 
		updatedAt    DATETIME, 
		enabled       BOOLEAN,
		name VARCHAR(64) NOT NULL, 
 
    PRIMARY KEY(Id)
	

) ENGINE=InnoDB DEFAULT CHARSET=latin1;

 INSERT INTO `ad_b30e7fb32053c27`.`products` (`id`, `createdAt`, `updatedAt`, `enabled`, `name`) 
                          VALUES ('1', STR_TO_DATE('1-01-2015', '%d-%m-%Y'), STR_TO_DATE('1-01-2015', '%d-%m-%Y'), '-1', 'product 1');
 
  INSERT INTO `ad_b30e7fb32053c27`.`products` (`id`, `createdAt`, `updatedAt`, `enabled`, `name`) 
                          VALUES ('2', STR_TO_DATE('1-01-2015', '%d-%m-%Y'), STR_TO_DATE('1-01-2015', '%d-%m-%Y'), '-1', 'product beta');

 INSERT INTO `ad_b30e7fb32053c27`.`products` (`id`, `createdAt`, `updatedAt`, `enabled`, `name`) 
                          VALUES ('3', STR_TO_DATE('1-01-2015', '%d-%m-%Y'), STR_TO_DATE('1-01-2015', '%d-%m-%Y'), '-1', 'product 3');

 INSERT INTO `ad_b30e7fb32053c27`.`products` (`id`, `createdAt`, `updatedAt`, `enabled`, `name`) 
                          VALUES ('4', STR_TO_DATE('1-01-2015', '%d-%m-%Y'), STR_TO_DATE('1-01-2015', '%d-%m-%Y'), '-1', 'product delta');


##--INSERT INTO   attendeerequest VALUES (1,'smith','hannibal','xyz ltd', 'event01');
##--INSERT INTO   attendeerequest VALUES (2,'smith2','hannibal2','xyz ltd', 'event02');
 

 ###################################
#
# Views
#
####################################
