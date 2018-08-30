const TAG="TEST === ";
const sendReply=function (){};
const bot=global.bot;
//console.log(TAG,"LOADING ");
const Config=require('./config');
const templateMessages=require('./templateMessages');
const Contexts=require('./Contexts');
var setTimeOut=function(sessionId)
{
    // console.log(TAG,"timeout interval ",Config.TIMEOUT_INTERVAL);
  	// Check if any time out is already assigned for the user.
		if(Config.SET_TIMER===true)
		 {
			 if(global.session[sessionId].timeout_handler!==null)
			 {		
				 //console.log(TAG,"resseting the timer");
				 	clearInterval(global.session[sessionId].timeout_handler);
					global.session[sessionId].timeout_handler=null;
			 }// [End clearInterval if exists]


		  		// console.log("Undefined message event");
		  		global.session[sessionId].timeout_handler=setInterval(function(){
		        let reply={};
		        reply.text=templateMessages.TIMEOUT_MESSAGES[Math.floor(Math.random()*templateMessages.TIMEOUT_MESSAGES.length)];
			    	sendreply(sessionId,reply,false);
						},Config.TIMEOUT_INTERVAL);
		  	// sendreply(sessionId,{text:"Hello!!!"});



		}// [end if check timeout allowed]

}// [End timeout]

function sendreply(...arg)
{
	
	//console.log(TAG," Trying to send message",arg);
	let sessionId=null;
	let data=null;
	let setTimer=null;
	let callback;
	sessionId=arg[0];
	setTimer=arg[2];
	fbid=global.session[arg[0]].fbid;
	data=arg[1];
	if(arg.length===4){callback=arg[3]};
	if(setTimer===true)
	{setTimeOut(sessionId);}

	bot.sendMessage(fbid, data,(err,res)=>
	{
		if(err) {
			console.error(TAG,"ERROR at bot.sendMessage in sendreply\n"+res);
			throw err;
			}
			else
			{


				if(false===(typeof callback==='undefined'))
					{
					callback(true);

					}

			}// End else


	});

}// End sendreply

//This function will add log to the logs function
var addLog=function(data,sessionId)
{
	try
	{
		//User has been sent text message in reply
		if(typeof data.text !=='undefined')
		{global.session[sessionId].logs[Date.now()]={type:1,input:"Text",data:data.text,context:global.session[sessionId].context};}
	
		//User shown buttons
		else if(data.attachment.payload.template_type==='button')		
		{global.session[sessionId].logs[Date.now()]={type:1,input:"Buttons",text:data.attachment.text,data:data.attachment.buttons,context:global.session[sessionId].context};}
		
		//User shown cardview
		else if(data.attachment.payload.template_type==='generic')  
		{
			global.session[sessionId].logs[Date.now()]={type:1,input:"Cardview",text:data.attachment.text,data:data.attachment.buttons,context:global.session[sessionId].context};
			
		}
	
			
		

		
	}
	catch(err)
	{
		
		
	}
	

}
global.sendreply=sendreply;
global.CONTEXTS={};
global.CONTEXTS[Contexts.CONTEXT_SESSION_ENTERPRISE]=require('./menuoptions/MenuEnterprise');
global.CONTEXTS[Contexts.CONTEXT_SESSION_INDIVIDUAL]=require('./menuoptions/MenuIndividual');
global.CONTEXTS[Contexts.CONTEXT_SESSION_FREE_BIZ_TOOL]=require('./menuoptions/MenuFreeBizTools');
//global.CONTEXTS[Contexts.CONTEXT_SESSION_FREE_BIZ_TOOL]=require('./menuoptions/MenuFreeBizTools');
global.CONTEXTS[Contexts.CONTEXT_TEMPLATE_MESSAGE]=require('./templateMessages');


/*const manipulateOutput = require('./manipulateOutput');
const sessionDefault=require('./sessionDefault');
const sessionGreet=require('./sessionGreet');
const sessionSupplier=require('./sessionSupplier');
const sessionHelp=require('./sessionHelp');
const sessionDistributor=require('./sessionDistributer');
const sessionBuyer=require('./sessionBuyer');
const sessionRegistration=require('./userRegistration');
const sessionEnterprise=require('./menuoptions/MenuEnterprise');
const sessionIndividual=require('./menuoptions/MenuIndividual');
const sessionFreeBizTools=require('./menuoptions/MenuFreeBizTools');
const breadCrum=require('./breadCrums');*/

/*for (var i in global.CONTEXTS)
	{
	console.log(i, global.CONTEXTS[i]);
	
	}*/

/*const CONTEXT_SESSION_SUPPLIER='supplierSession';
const CONTEXT_SESSION_MEETING='meetingSession';
const CONTEXT_SESSION_BUYER='buyerSession';
const CONTEXT_SESSION_DISTRIBUTER='distributerSession';
const CONTEXT_SESSION_HELP='helpSession';
const CONTEXT_SESSION_FREE_BIZ_TOOL='freebizsession';

const CONTEXT_SESSION_DEFAULT='defaultSession';
const CONTEXT_SESSION_GREET='greetingSession';
const CONTEXT_UNDEFINED='undefined';*/

