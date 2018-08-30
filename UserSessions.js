/*jshint esversion: 6 */
/*'use strict'*/
const TAG='UserSessions === ';
//onsole.log(TAG,' Loading modules');
const templateMessages=require("./templateMessages");
//This module stores the previous sessions of users
var userRegistration=require("./userRegistration");
const Config=require('./config');
const Contexts=require('./Contexts');
global.session= {};

////const appjs=require('./app');
var async = require("async");
//[Start findOrCreateSession]
function findOrCreateSession
(fbid,callback)
{
    var sessionId;
 	 // Let's see if we already have a session for the user fbid
    Object.keys(global.session).forEach(k => {
      if (global.session[k].fbid === fbid) {
	//console.log('Found pervious session');
         sessionId = k;
      }
    });
    if (!sessionId) {
      // No session found for user fbid, let's create a new one
      sessionId = new Date().toISOString();

//	console.log('Creating new session_________________',sessionId);
	global.session[sessionId] = {fbid: fbid, context: {}};
	global.session[sessionId].breadCrum={};
	global.session[sessionId].logs={};

	global.session[sessionId].timeout_handler=null;

	/*
	 * User has sent the first message..let whatever be the message.
	 * Greet him
	 * */
	var reply={};
	reply.text=templateMessages.FIRST_MESSAGE_TO_USER;
	global.session[sessionId].context.FirstGreet=true;
	//global.session[sessionId]
	global.sendreply(sessionId,reply,false);
	// appjs.mybot.getProfile(global.session[sessionId].fbid, (err, profile) => {
	// 	if (err) {
	// 		console.log(TAG,"Error in getting user name ");
	// 		throw err;
	// 			}
	// 	global.session[sessionId].first_name=profile.first_name ;
	// 	global.session[sessionId].last_name=profile.last_name;
  //
	// 	});

    }
  // console.log(TAG, " is registered ? ", global.session[sessionId].registered);
    if(typeof global.session[sessionId].registered==='undefined')
    	{

		userRegistration.checkUser(fbid,function(re,ispresent)
		{
			 if(ispresent.length===0)
				 {
			    	//console.log(TAG,"unregidtered USER");
			    	global.session[sessionId].context.context=Contexts.CONTEXT_SESSION_REGISTRATION;
			    	global.session[sessionId].context.type=userRegistration.REGSIRATION_NEW;
			    	global.session[sessionId].registered=0;
			    	//console.log(TAG,"context before callback",global.session[sessionId].context.context);
			    	callback(null,sessionId);
				 }
			 	else
				 {
			 		//console.log(TAG,"registered USER");
			 		global.session[sessionId].context.context=Contexts.CONTEXT_SESSION_GREET;
			 		global.session[sessionId].registered=1;
			 		//console.log(TAG,"constext before callback",global.session[sessionId].context.context);
			 		callback(null,sessionId);

				 }
		});
    	
    	global.session[sessionId].context.context=Contexts.CONTEXT_SESSION_GREET;
    	global.rungreet(sessionId,'menu');
    	global.session[sessionId].registered=1;
    	}
    else if(global.session[sessionId].registered===1)
    {
    	//Do nothing ..keep going as is...
    	 callback(null,sessionId);
    }

    else if(global.session[sessionId].registered===-1)
    {
    	//User said no to regsiter
    	//Do nothing ..keep going as is...
    	 callback(null,sessionId);
    }
    else
    {
	    // console.log(TAG,"____________ewfwe");
    	// global.session[sessionId].context.context=Contexts.CONTEXT_SESSION_GREET;
 	    // global.session[sessionId].registered=1;
 		 callback(null,sessionId);
    }

    }//[EndfindOrCreateSession]

module.exports =
{//[Start Export Modules]
//sessions:sessions,
findOrCreateSession,
};// [End Export Modules]
