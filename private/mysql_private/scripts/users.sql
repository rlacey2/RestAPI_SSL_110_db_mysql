
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


DROP TABLE IF EXISTS  users;
CREATE TABLE users (
    id   INT NOT NULL AUTO_INCREMENT,
		createdAt    DATETIME, 
		updatedAt    DATETIME, 
		active       BOOLEAN,
		username VARCHAR(128) NOT NULL,
		name VARCHAR(64) NOT NULL, 
    salt VARCHAR(64) NOT NULL, 
		password VARCHAR(64) NOT NULL, 
    role VARCHAR(16) NOT NULL, 
		revokeToken       BOOLEAN,
		enabled       BOOLEAN,
		timeout INT NOT NULL  DEFAULT -1,
    PRIMARY KEY(Id)
	

) ENGINE=InnoDB DEFAULT CHARSET=latin1;

 INSERT INTO `ad_b30e7fb32053c27`.`users` (`id`, `createdAt`, `updatedAt`, `active`, `username`, `name`, `salt`, `password`,
                                               `role`, `revokeToken`, `enabled`, `timeout`) 
                          VALUES ('1', STR_TO_DATE('1-01-2015', '%d-%m-%Y'), STR_TO_DATE('1-01-2015', '%d-%m-%Y'), '-1', 'rlacey1@example.com', 'rlacey1', 
                                   'ddddd', 'pass1', 'user', '0', '-1', '-1');
 
INSERT INTO `ad_b30e7fb32053c27`.`users` (`id`, `createdAt`, `updatedAt`, `active`, `username`, `name`, `salt`, `password`,
                                               `role`, `revokeToken`, `enabled`, `timeout`) 
                          VALUES ('2', STR_TO_DATE('1-01-2015', '%d-%m-%Y'), STR_TO_DATE('1-01-2015', '%d-%m-%Y'), '-1', 'rlacey2@example.com', 'rlacey2', 
                                   'ddddd', 'pass2', 'admin', '0', '-1', '-1');
 
INSERT INTO `ad_b30e7fb32053c27`.`users` (`id`, `createdAt`, `updatedAt`, `active`, `username`, `name`, `salt`, `password`,
                                               `role`, `revokeToken`, `enabled`, `timeout`) 
                          VALUES ('3', STR_TO_DATE('1-01-2015', '%d-%m-%Y'), STR_TO_DATE('1-01-2015', '%d-%m-%Y'), '-1', 'rlacey3@example.com', 'rlacey3', 
                                   'ddddd', 'pass3', 'admin', '-1', '0', '-1');

INSERT INTO `ad_b30e7fb32053c27`.`users` (`id`, `createdAt`, `updatedAt`, `active`, `username`, `name`, `salt`, `password`,
                                               `role`, `revokeToken`, `enabled`, `timeout`) 
                          VALUES ('4', STR_TO_DATE('1-01-2015', '%d-%m-%Y'), STR_TO_DATE('1-01-2015', '%d-%m-%Y'), '-1', 'rlacey4@example.com', 'rlacey4', 
                                   'ddddd', 'pass4', 'admin', '-1', '-1', '-1');


## CREATE TRIGGER attendeeheader01 BEFORE INSERT ON attendeeheader FOR EACH ROW SET NEW.createdAt = NOW();


 


##--INSERT INTO   attendeerequest VALUES (1,'smith','hannibal','xyz ltd', 'event01');
##--INSERT INTO   attendeerequest VALUES (2,'smith2','hannibal2','xyz ltd', 'event02');
 

 ###################################
#
# Views
#
####################################
