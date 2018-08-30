/*jshint esversion: 6 */

//CREATE TABLE QURIES
//mysql -h localhost -u root -p
/*CREATE DATABASE IF NOT EXISTS sampleBot;
USE sampleBot;


CREATE TABLE IF NOT EXISTS users (
  user_id INT NOT NULL AUTO_INCREMENT,
  fb_id VARCHAR(20) DEFAULT NULL,
  name varchar(20) DEFAULT NULL,
  type INT DEFAULT NULL,
  contact INT DEFAULT NULL,
  email VARCHAR(20) DEFAULT NULL,
  PRIMARY KEY (user_id)
);



//DROP TABLE
DROP TABLE  IF EXISTS users;
TRUNCATE TABLE users;

//INSERT QUERIES
INSERT INTO users VALUES (1,"ff"), (2), (5);
INSERT INTO users (name) VALUES ("ff");



//VIEW TABLE
SELECT * FROM users;
SELECT * FROM users WHERE fb_id =
*/
const queryGetUser='SELECT * FROM users WHERE fb_id = ';
var m=100;
module.exports=
{
m
};