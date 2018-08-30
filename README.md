

# ChatBot


#CHANGES

In config.js file :

	1.Change the following variables for mysql database connection:
		a. BOT_DATABASE='sampleBot';
		b. USER_TABLE='users';
		c. BOT_DATABASE_USER_NAME='root';
		d. BOT_DATABASE_PASS='root';
		e. DATABASE_URL='localhost';
	
	2.Change the following variables for mongodb database connection:
		a. MONGO_URL
		b. MONGO_USER
		c. MONGO_PASSWORD
	
	3.To turn the loggind ON or OFF change the following variable:
	    a.LOGGER
	    Dump logs in Mongodb : LOGGER = true
		Do not Dump logs in Mongodb : LOGGER = false
	
	
	4.For breadcrums to be shown change the following variable:
		a.CHAT_SERVER  -  URL OF THE chat-server
	
	5.To set timeout i.e. ask user if he is there but it will keep connection active even after :
		a. SET_TIMER=true; //If true user will be shown messages like "Are u there? ","Too busy to ignore me?",etc.
		(The messages can be changed from templateMessages.js in array named "TIMEOUT_MESSAGES".)
		b. TIMEOUT_INTERVAL=600000;//milliseconds	currently 10 mins		


'users' table format :


 CREATE TABLE IF NOT EXISTS users (
  user_id INT NOT NULL AUTO_INCREMENT,
  fb_id varchar(20) DEFAULT NULL,
  name varchar(50) DEFAULT NULL,
  email varchar(50) DEFAULT NULL,
  contact varchar(20) DEFAULT NULL,
  PRIMARY KEY (user_id)
);


## Usage
To run on terminal:
	
	node app.js
	
To run in background forever:
	
	nohup nodejs app.js &


To run the ngrok in background forever:

	nohup ./ngrok http 3000 &
	
To give https tunneling to the nodejs applicaiton use ngrok. This command runs ngrok in backgrpund forever independent of terminal


	curl  http://localhost:4040/api/tunnels > tunnels.json
	cat tunnels.json
Use the above command to get the https address of the ngrok.



### Tools

Created with [Nodeclipse](https://github.com/Nodeclipse/nodeclipse-1)
 ([Eclipse Marketplace](http://marketplace.eclipse.org/content/nodeclipse), [site](http://www.nodeclipse.org))   

Nodeclipse is free open-source project that grows with your contributions.
