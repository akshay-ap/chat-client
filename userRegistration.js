/*jshint esversion: 6 */
const templateMessages=require("./templateMessages");
var Contexts=require('./Contexts');
const config=require('./config');
const manipulateOutput=require('./manipulateOutput');
const TAG = 'userRegistration ===';
var mysql = require('mysql');

//const UserSessions = require('./UserSessions');

const POST_BACK_REGISTER_RESPONSE_YES='register_YES';
//const appjs=require('./app');
const POST_BACK_REGISTER_RESPONSE_NO='register_NO';
const sessionGreet=require('./sessionGreet');
const breadCrums=require('./breadCrums');
// Use this function to check if user exists in DATABASE
var QUERY_CHECK_USER='SELECT * from users WHERE fb_id = ';
var REGISTRATION_NAME='add_name';
var REGSIRATION_NEW='add_complete';
var REGISTRATION_NUMBER='add_number';
var REGISTRATION_EMAIL='add_email';
const _ = require('underscore');


function sendQuery(query,callback)
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
	connection.connect(function(err){ 
		console.log(err);
		console.log(TAG,"eroooooooor")});
	// Send Query to Database
	connection.query(query ,function(err, rows, fields) {
	  if (err)
	   {
		  console.log('Error while performing Query at CHECK USER.');
	   }
	  // Close the Connection
	  connection.end();
	  callback(rows);
	});
}


function sendRegisterQuery(sessionId,input_fbid,input_name,input_email,input_number,callback)
{
/*
 * Use this function to register a new user Query format: INSERT INTO users
 * (fb_id,name,email,contact) VALUES ('1399721456736511',"Akshay
 * Patel","akshay.ap95@gmail.com","+917385811998");
 * 
 */
	var connection = mysql.createConnection({
		  host     : config.DATABASE_URL,
		  user     : config.BOT_DATABASE_USER_NAME,
		  password : config.BOT_DATABASE_PASS,
		  database : config.BOT_DATABASE
		});

	connection.connect();//
	connection.query('INSERT INTO users SET ?',{'fb_id':input_fbid,'name':input_name,'email':input_email,'contact':input_number}, function (err, results, fields) {
		  if (err)
		   {
			  console.log('Error while performing Query at CHECK USER.');
			  throw err;
		   }
		  else
		  {


			  var reply={};
			  reply.text='Thank you '+global.session[sessionId].first_name+',<br>'+
			  templateMessages.REGISTRATION_GREET;
			  // GREET THE USER FOR REGISTRATION. AND REDIRECT TO SHOW THE
				// MENU
			  global.sendreply(sessionId,reply,true,function(result){ callback(results);});


		  }
		  connection.end();
		});
	// 'INSERT INTO users SET
	// ?',{fb_id:input_fbid,name:input_name,email:input_email,contact:input_number}
	// Connect to Database

}







function checkUser (fbid,callback)
{
	var query=QUERY_CHECK_USER +"\""+ fbid+"\"" + ';';
	// console.log(query);
	sendQuery(query,function(result){
		// console.log(TAG +' checkUser ===',[null,result]);
		callback(null,result);
	});
}// [End checkUser]



function finishRegistration(sessionId)
{
	this.email=global.session[sessionId].context.email;
	this.number=global.session[sessionId].context.number;
	// this.name=global.session[sessionId].first_name+"
	// "+global.session[sessionId].last_name;
	this.name=global.session[sessionId].first_name;

	sendRegisterQuery(sessionId,global.session[sessionId].fbid,this.name,this.email,this.number,function(result)
			{
		// console.log(TAG,"User registration result ",result);

		global.session[sessionId].context.pre_context=Contexts.CONTEXT_SESSION_REGISTRATION;
		global.session[sessionId].context.context=Contexts.CONTEXT_SESSION_GREET;
		sessionGreet.showMenu(sessionId);
			});

	global.session[sessionId].registered=1;
	delete global.session[sessionId].context.sub_context;
	delete global.session[sessionId].context.email;
	delete global.session[sessionId].context.number;

/*
 * global.session[sessionId].context.context=Contexts.CONTEXT_SESSION_GREET;
 * sessionGreet.run('hi',sessionId);
 */

}


var initRegistrationRequest =function (...arg)
{
		// arg[0]=sessionId
		var sessionId=arg[0];

		global.session[sessionId].context.context=Contexts.CONTEXT_SESSION_REGISTRATION;
		breadCrums.update_breadCrum(sessionId,2,"Register",initRegistrationRequest,[sessionId]);

		var reply={};
		reply.text=templateMessages.REGISTRAITON_REQUEST;
		global.session[sessionId].context.sub_context=REGISTRATION_NAME;
		global.sendreply(sessionId,reply,true,function(res)
				{
			
			reply.text="Please enter your name";
			global.sendreply(sessionId,reply,true);
			breadCrums.update_breadCrum(sessionId,3,"name");

				});
	

	/*
	 * manipulateOutput.getButtonOutput(templateMessages.REGISTRAITON_REQUEST,['Yes','No'],[POST_BACK_REGISTER_RESPONSE_YES,POST_BACK_REGISTER_RESPONSE_NO],function(finalOutput) {
	 * var reply={}; reply.attachment=finalOutput;
	 * global.sendreply(sessionId,reply,true); });
	 */
};
function handlePostback(postback,sessionId)
{
	if(postback===POST_BACK_REGISTER_RESPONSE_YES)
		{
	// console.log(TAG," USER SAID YES");
		global.session[sessionId].context.sub_context=REGISTRATION_NAME;
	// console.log(TAG,REGISTRATION_NUMBER," type of input
	// ",global.session[sessionId].context.sub_context);
		var reply={};
		breadCrums.update_breadCrum(sessionId,3,"name");
		reply.text="Please enter your name.";
		global.sendreply(sessionId,reply,true);

		}
	else if(postback===POST_BACK_REGISTER_RESPONSE_NO)
		{
		// console.log(TAG," USER SAID NO");
		global.session[sessionId].registered=-1;

		// global.session[sessionId].registered=-1;
		// console.log(TAG,global.session[sessionId].registered);
		global.session[sessionId].context.pre_context=Contexts.CONTEXT_SESSION_REGISTRATION;
		global.session[sessionId].context.context=Contexts.CONTEXT_SESSION_GREET;
		global.rungreet(sessionId,'menu');

		}
	else if(global.session[sessionId].context.type===REGSIRATION_NEW)
	{
		 global.session[sessionId].context.type=null;
		 delete global.session[sessionId].context.type;
		 initRegistrationRequest(sessionId);
	}

}

function handleMessage(message,sessionId)
{
	let reply={};
	message= message.toLowerCase();
	var words=message.split(' ');
	if(global.session[sessionId].context.type===REGSIRATION_NEW)
	{
		 global.session[sessionId].context.type=null;
		 delete global.session[sessionId].context.type;
		 initRegistrationRequest(sessionId);
	}
	else if(_.intersection(words,['ok','yes','y']).length!==0&&words.length===1)
	{
		// user types yes to register
		// generate a post-back to initialize registration
		handlePostback(POST_BACK_REGISTER_RESPONSE_YES,sessionId);
	}
	else if(_.intersection(words,['no','nope','n']).length!==0&&words.length===1)
	{
		// user types no to register

		// generate a post-back to cancel registration

		handlePostback(POST_BACK_REGISTER_RESPONSE_NO,sessionId);
	}
	else if(_.intersection(words,sessionGreet.arrayGreetings).length!==0&&words.length===1)
	{
		delete global.session[sessionId].context.sub_context;
		delete global.session[sessionId].context.email;
		delete global.session[sessionId].context.number;
		global.session[sessionId].context.context=Contexts.CONTEXT_SESSION_GREET;
		sessionGreet.run('hi',sessionId);

	}

	else if(global.session[sessionId].context.sub_context===REGISTRATION_NUMBER)
	{
		

		// console.log(TAG," get user number ",message);
		message=message.replace(/[^\0-9]/g,'');
		if(message.length>=8&&message.length<15)
		{
			global.session[sessionId].context.number=message;
			global.session[sessionId].context.sub_context=REGISTRATION_EMAIL;
			breadCrums.update_breadCrum(sessionId,3,"email");

			reply.text="Please enter your email-id.";
			global.sendreply(sessionId,reply,true);
		}
		else
		{
			reply.text="Please enter correct contact number.";
			global.sendreply(sessionId,reply,true);
		}


	}
	else if(global.session[sessionId].context.sub_context===REGISTRATION_EMAIL)
	{

		var emailsArray = message.match(/([a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z0-9._-]+)/gi);
		if (emailsArray !== null && emailsArray.length) {
		   // console.log(emailsArray);
			global.session[sessionId].context.email=emailsArray[0];
			// console.log(TAG," get user email ",message);
			finishRegistration(sessionId);
		}
		else
		{
			reply.text="Please enter correct email-id.";
			global.sendreply(sessionId,reply,true);
		}

	}

	else if(global.session[sessionId].context.sub_context===REGISTRATION_NAME)
	{
		
		global.session[sessionId].first_name=message;
		global.session[sessionId].context.sub_context=REGISTRATION_NUMBER;
		// console.log(TAG,REGISTRATION_NUMBER," type of input
		// ",global.session[sessionId].context.sub_context);
		breadCrums.update_breadCrum(sessionId,3,"number");

		reply.text="Please enter your contact number.";
		global.sendreply(sessionId,reply,true);


	}


}



function registerUserNumber(fbid)
{

	var reply={};
	reply.text='What is your name?';
	global.sendreply(fbid,reply);


}

function run(session_data,sessionId)
{
	// console.log(TAG,sessionId, " STARTING RUN ");
	console.log(TAG,"RUNNING REGISTRATION");
	initRegistrationRequest(sessionId);
}

module.exports =
{// [START MODULE EXPORTS]
checkUser,
run,
REGSIRATION_NEW,
REGISTRATION_NUMBER,
REGISTRATION_EMAIL,
handlePostback,
handleMessage
};// [END MODULE EXPORTS]
