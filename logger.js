var MongoClient = require('mongodb').MongoClient;
var assert = require('assert');
const Config=require('./config');

const url = Config.MONGO_URL;

const USER_NAME=Config.MONGO_USER;
const USER_PASSWORD=Config.MONGO_PASSWORD;
var insertDocument = function(db,data) {
	
		db.admin().authenticate(USER_NAME, USER_PASSWORD, function(err, res) {
			//console.log("thiss===",res);
			
			 db.collection('Logs').insertOne(data, function(err, result) {
				    assert.equal(err, null);
				    console.log("Inserted a document into the Logs collection.");
				    //callback();
				  });
			 db.close();	
			 });
	  
	
};

var dumpLogs=function(data)
{

	if(Config.LOGGER===true)
	{
	MongoClient.connect(url, function(err, db) {
		  assert.equal(null, err);
		  console.log("Connected correctly to server.");
		  insertDocument(db,data);
		 
		});	
	
	}
	else
		{
	    console.log("Logging is turned off.");

		}

};


module.exports={
		dumpLogs
};


/*
Mongod

mongo --port 27017 -u "admin" -p "admin123"  --authenticationDatabase "admin"
mongo --port 27017 -u "bot" -p "bot"  --authenticationDatabase "admin"

> use Logs
switched to db Logs
db.createUser({ user : "bot", pwd:'bot', roles:[{role:"readWrite", db:"Logs"}] })



Successfully added user: {
	"user" : "bot",
	"roles" : [
		{
			"role" : "readWrite",
			"db" : "Logs"
		}
	]
}



db.updateUser(
   "bot",
   {
    
     roles : [
               { role: "readWrite", db: "Logs" },
              
             ],
     pwd: "bot"
    })


*/

