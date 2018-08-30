/*jshint esversion: 6 */
const TAG='sessionWrapper';
const  Contexts=require('./Contexts');

const templateMessages=require('./templateMessages');
const breadCrums=require('./breadCrums');
const sessionBuyer=require('./sessionBuyer');
const sessionMeeting=require('./sessionMeeting');
//const sessionHelp=require('./sessionHelp');
const sessionSupplier=require('./sessionSupplier');
const sessionDistributer=require('./sessionDistributer');
const sessionRegistration=require('./userRegistration');
const UserSessions = require('./UserSessions') ;
//const appjs=require('./app');


const manipulateOutput=require('./manipulateOutput');

const sessionEnterprise=require('./menuoptions/MenuEnterprise');
const sessionIndividual=require('./menuoptions/MenuIndividual');
const sessionFreeBizTools=require('./menuoptions/MenuFreeBizTools');
const sessionGreet=require('./sessionGreet');




var sessionResolver=function(sessionId,callback)
{
	let currentSession='sessionGreet';
	console.log(TAG,"___RESOLVING SESSION ID ",sessionId);
	 if(typeof global.session[sessionId].context.context==='undefined')
	{
		console.log(TAG,"UNDEFINED SESSION FOR POSTBACK for ",sessionId, "for ", global.session[sessionId].fbid);
		
	}
	 else if(global.session[sessionId].context.context===Contexts.CONTEXT_SESSION_GREET)
	{
		 console.log(TAG,"sdf");

		 currentSession=sessionGreet;
	}
	else if(global.session[sessionId].context.context===Contexts.CONTEXT_SESSION_ENTERPRISE)
	{
		 console.log(TAG,"s222df");

		currentSession=sessionEnterprise;
	}
	else if(global.session[sessionId].context.context===Contexts.CONTEXT_SESSION_INDIVIDUAL)
	{
		 console.log(TAG,"333sdf");

		currentSession=sessionIndividual;
	}
	else if(global.session[sessionId].context.context===Contexts.CONTEXT_SESSION_FREE_BIZ_TOOL)
	{
		 console.log(TAG,"444sdf");

		currentSession=	sessionFreeBizTools;
	}
	else if(global.session[sessionId].context.context===Contexts.CONTEXT_SESSION_HELP)
	{
		
		 console.log(TAG,"5555sdf");

	//	currentSession=sessionHelp;
		
	}
	else if(global.session[sessionId].context.context===Contexts.CONTEXT_SESSION_SUPPLIER)
	{
		 console.log(TAG,"6666sdf");

		currentSession=sessionSupplier;

	}else if(global.session[sessionId].context.context===Contexts.CONTEXT_SESSION_DISTRIBUTER)
	{
		 console.log(TAG,"777sdf");

		currentSession=sessionDistributer;

	}else if(global.session[sessionId].context.context===Contexts.CONTEXT_SESSION_BUYER)
	{
		 console.log(TAG,"8888sdf");

		currentSession=sessionBuyer;

	}	
	else if(global.session[sessionId].context.context===Contexts.CONTEXT_SESSION_REGISTRATION)
	{
		 console.log(TAG,"999sdf");

		currentSession=sessionRegistration;
	}	

	 global.session[sessionId].sessionObj=currentSession;
	 console.log(TAG,currentSession);
	 callback(currentSession);
};


module.exports=
{
		
		
sessionGreet:require('./sessionGreet'),
 Contexts:require('./Contexts'),
 templateMessages:require('./templateMessages'),
 breadCrums:require('./breadCrums'),
 sessionBuyer:require('./sessionBuyer'),
 sessionMeeting:require('./sessionMeeting'),
 //sessionHelp:require('./sessionHelp'),
 sessionSupplier:require('./sessionSupplier'),
 sessionDistributer:require('./sessionDistributer'),
 sessionRegistration:require('./userRegistration'),
 UserSessions : require('./UserSessions') ,
 appjs:require('./app'),

 
 manipulateOutput:require('./manipulateOutput'),
 
 sessionEnterprise:require('./menuoptions/MenuEnterprise'),
 sessionIndividual:require('./menuoptions/MenuIndividual'),
 sessionFreeBizTools:require('./menuoptions/MenuFreeBizTools'),
 
 sessionResolver
 
};
