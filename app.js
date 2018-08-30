/*jshint esversion: 6 */
const TAG='app.js === ';

const SqlQuries=require('./SqlQuries');
global.POSTBACKS={};


// console.log(TAG,' Loading modulesrterter');
const http = require('http');
const Bot = require('./newBot');
const Config= require('./config');
const Contexts=require('./Contexts');
const templateMessages=require('./templateMessages');
const UserSessions = require('./UserSessions');
const LogsStore=require('./logger');
'use strict';
const async = require("async");
const sessionWrapper=require('./sessionWrapper');

// var mm=require('./manipulateMessage');
const manipulateOutput = require('./manipulateOutput');
const sessionDefault=require('./sessionDefault');
const sessionGreet=require('./sessionGreet');
const sessionSupplier=require('./sessionSupplier');
const sessionHelp=require('./sessionHelp');
const sessionDistributor=require('./sessionDistributer');
const sessionBuyer=require('./sessionBuyer');
const sessionRegistration=require('./userRegistration');

const breadCrum=require('./breadCrums');

// Setup the Bot
let bot = new Bot({
token:Config.PAGE_ACCESS_TOKEN,
verify: Config.VERIFY_TOKEN
});

// Declare the bot global
global.bot=bot;
const test=require('./test');
// End setup bot


function runMessage(payload,sessionId)
{
	let text = payload.message.text;
	var dataToProcess=[text,sessionId];
	console.log(TAG, "Session is : ",global.session[sessionId].context.context);

	if(typeof global.session[sessionId].context.context===Contexts.CONTEXT_UNDEFINED)
	{
		console.log(TAG ," Undefined Session");
		global.session[sessionId].context.context=Contexts.CONTEXT_SESSION_DEFAULT;
		sessionDefault.run(payload,sessionId);
	}
	else if(global.session[sessionId].context.context===Contexts.CONTEXT_SESSION_SUPPLIER)
	{
			sessionSupplier.handleMessage(text,sessionId);
	}
	else if(global.session[sessionId].context.context===Contexts.CONTEXT_SESSION_GREET)
	{
			sessionGreet.handleMessage(text,sessionId);
	}
	else if(global.session[sessionId].context.context===Contexts.CONTEXT_SESSION_HELP)
	{
			sessionHelp.handleMessage(text,sessionId);
	}
	else if(global.session[sessionId].context.context===Contexts.CONTEXT_SESSION_REGISTRATION)
	{

		sessionRegistration.handleMessage(text,sessionId);

	}
}// [END run message processing]


function runPostback(postback,sessionId)
{
	console.log(TAG,"POSTBACK_______________ CONTEXT ", global.session[sessionId].context.context);
	console.log(TAG+ " Postback recieved ",postback);
	//[outer if]
	if(typeof global.POSTBACKS[postback]!=='undefined' && typeof global.POSTBACKS[postback]==='function')
		{
		
		global.POSTBACKS[postback].call(this,postback,sessionId);
		}
	else{
		//console.log(TAG, "TYPE OF OBEJCT ASSCOCATED ",typeof global.POSTBACKS[postback]);
	 if(typeof global.session[sessionId].context.context==='undefined')
	{
		console.log(TAG,"UNDEFINED SESSION FOR POSTBACK for ",sessionId, "for ", global.session[sessionId].fbid);

	}
	 else if(global.session[sessionId].context.context===Contexts.CONTEXT_SESSION_GREET)
	{
		sessionGreet.handlePostback(postback,sessionId);
	}
	else if(global.session[sessionId].context.context===Contexts.CONTEXT_SESSION_ENTERPRISE)
	{
		global.CONTEXTS[Contexts.CONTEXT_SESSION_ENTERPRISE].handlePostback(postback,sessionId);
	}
	else if(global.session[sessionId].context.context===Contexts.CONTEXT_SESSION_INDIVIDUAL)
	{
		global.CONTEXTS[Contexts.CONTEXT_SESSION_INDIVIDUAL].handlePostback(postback,sessionId);
	}
	else if(global.session[sessionId].context.context===Contexts.CONTEXT_SESSION_FREE_BIZ_TOOL)
	{
		global.CONTEXTS[Contexts.CONTEXT_SESSION_FREE_BIZ_TOOL].handlePostback(postback,sessionId);
	}
	else if(global.session[sessionId].context.context===Contexts.CONTEXT_SESSION_HELP)
	{

		sessionHelp.handlePostback(postback,sessionId);

	}
	else if(global.session[sessionId].context.context===Contexts.CONTEXT_SESSION_SUPPLIER)
	{
		sessionSupplier.handlePostback(postback,sessionId);

	}else if(global.session[sessionId].context.context===Contexts.CONTEXT_SESSION_DISTRIBUTER)
	{

		sessionDistributor.handlePostback(postback,sessionId);

	}else if(global.session[sessionId].context.context===Contexts.CONTEXT_SESSION_BUYER)
	{

		sessionBuyer.handlePostback(postback,sessionId);

	}
	else if(global.session[sessionId].context.context===Contexts.CONTEXT_SESSION_REGISTRATION)
	{

		sessionRegistration.handlePostback(postback,sessionId);
	}
	}//[outer else]
}


console.log('Chat bot has Started');

bot.on('error', (err) => {
  console.log(err.message);
});

bot.on('postback', (payload, reply) => {
	UserSessions.findOrCreateSession(payload.sender.id,function(dummy,sessionId){
		// console.log(TAG,"on postback sessionid ", sessionId);
		global.session[sessionId].logs[Date.now()]={type:0,input:"postback",data:payload.postback.payload,context:global.session[sessionId].context};
		runPostback(payload.postback.payload,sessionId);
	});

});// [END Post-back]


bot.on('breadcrum', (payload, reply) => {

	
	UserSessions.findOrCreateSession(payload.sender.id,function(dummy,sessionId){
	// console.log(TAG,"on postback sessionid ", sessionId);
		global.session[sessionId].logs[Date.now()]={type:0,input:"Breadcrum",data:payload.breadcrum.payload,context:global.session[sessionId].breadCrum};
		breadCrum.handle(payload.breadcrum.payload,sessionId);
	});
});// [END Post-back]



bot.on('message', (payload, reply) => {
	
// console.log(TAG,"=================",payload.sender.id);
		UserSessions.findOrCreateSession(payload.sender.id,function (re,sessionId)
		{
			global.session[sessionId].logs[Date.now()]={type:0,input:"Text",data:payload.message.text,context:global.session[sessionId].context};
			runMessage(payload,sessionId);
		});

});// [END bot on 'Message']


bot.on('disconnect',(payload,reply)=>
{
// This will be triggered whenever user got disconnected. So clear the timout
// and dump the data in database.
// Dumping of data to be done yet.
	UserSessions.findOrCreateSession(payload.sender.id,function (re,sessionId)
	{
		global.session[sessionId].logs[Date.now()]='User got disconnected';
		/*console.log(TAG,"\n==========START SUMMARY=============\n");
		console.log(JSON.stringify(global.session[sessionId].logs));	
		console.log(TAG,"\n==========END SUMMARY=============\n");
	*/
	let UserLogs={sessionId:global.session[sessionId].fbid,Logs:global.session[sessionId].logs};
	//	console.log(TAG,"\n==========START SUMMARY=============\n");

	//console.log(JSON.stringify(UserLogs));	

		LogsStore.dumpLogs(UserLogs);
		global.session[sessionId].logs=null;
		// console.log(TAG,"User got disconnected id: ",payload,sessionId);
		clearInterval(global.session[sessionId].timeout_handler);

	});

	// global.session[sessionId]=null;
});

http.createServer(bot.middleware()).listen(3000);


console.log('Listening on port 3000...chat bot v0.0.7');

/*Manage database Table*/
// SqlQuries.sendCreateTableQuery(function(res)	
// 		{

//  		console.log(TAG," DATABASE SETUP status : ", res);
	
	
//  		});
// {
	
// }
// module.exports.sendreply=sendreply;

