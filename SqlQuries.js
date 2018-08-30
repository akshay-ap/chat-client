/*jshint esversion: 6 */
const config=require('./config');
var mysql = require('mysql');
// Database setup

const CREATE_TABLE_USERS="CREATE TABLE IF NOT EXISTS users ("+
		  "user_id INT NOT NULL AUTO_INCREMENT,"+
		  "fb_id varchar(20) DEFAULT NULL,"+
		  "name varchar(50) DEFAULT NULL,"+
		  "email varchar(50) DEFAULT NULL,"+
		  "contact varchar(20) DEFAULT NULL,"+
		 " PRIMARY KEY (user_id)"+
		");";
const CREATE_DATABASE='CREATE DATABASE IF NOT EXISTS '+'`'+config.BOT_DATABASE+'`;';
var sendCreateTableQuery=function (callback)
{
/*
 * 
 * 
 * 
 */
	var connection = mysql.createConnection({
		  host     : config.DATABASE_URL,
		  user     : config.BOT_DATABASE_USER_NAME,
		  password : config.BOT_DATABASE_PASS,
		  database : config.BOT_DATABASE
		});

	// Connect to Database
	connection.connect();
	//+"`"+config.BOT_DATABASE+"`;"
	//	console.log(connection);
	connection.query('CREATE DATABASE IF NOT EXISTS test;', function (err) {
	    if (err) {throw err;}
	    connection.query('USE '+"`"+config.BOT_DATABASE+"`;", function (err) {
	        if (err) throw err;
	        connection.query(CREATE_TABLE_USERS, function (err) {
	                if (err) {
	                //	console.log("====false====");
	                throw err;
	                callback(false);
	                }
	                else{callback(true);}
	            });
	    });
	});

}
module.exports=
{
		sendCreateTableQuery
};


/*
//CREATE TABLE QURIES
mysql -h localhost -u root -p
CREATE DATABASE IF NOT EXISTS sampleBot;
USE sampleBot;


CREATE TABLE IF NOT EXISTS users (
  user_id INT NOT NULL AUTO_INCREMENT,
  fb_id varchar(20) DEFAULT NULL,
  name varchar(50) DEFAULT NULL,
  email varchar(50) DEFAULT NULL,
  contact varchar(20) DEFAULT NULL,
  PRIMARY KEY (user_id)
);

//DROP TABLE
DROP TABLE  IF EXISTS users;
//INSERT QUERIES
INSERT INTO users VALUES (1,"ff"), (2), (5);
INSERT INTO users (fb_id,name,email,contact) VALUES ('1399721456736511',"Akshay Patel","akshay.ap95@gmail.com","+917385811998");
                        1066963186
                        INSERT INTO users (fb_id,name,type,contact) VALUES ('1066963186',"Soham",0,998);
1385912211475113
//VIEW TABLE
SELECT * FROM users;

*/