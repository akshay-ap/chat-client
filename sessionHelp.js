/*jshint esversion: 6 */

//Import required modules
const Contexts=require('./Contexts');
const sessionGreet=require('./sessionGreet');
const templateMessages=require('./templateMessages');
const UserSessions = require('./UserSessions') ;
//const appjs=require('./app');
const _ = require('underscore');
//const mapQuery=require('./mapQuery');
const manipulateOutput=require('./manipulateOutput');
const sessionDefault=require('./sessionDefault');
const breadCrums=require('./breadCrums');
//var showMenu=require('./middle');
//console.log(showMenu);
const TAG="sessionHelp === ";
const ref_FAQ=['1.','1',' 1','faq','f.a.q.','f.a.q.','Faq','FAQ'];
const ref_AboutUs=['2.','2',' 2','about','abput us','about us','aboutus'];
const ref_Contact=['3.','3',' 3','contact','contact us'];
const LEVEL_1='sub_context_level_1';
const LEVEL_2='sub_context_level_2';
const sessionWrapper=require('./sessionWrapper');
//console.log(typeof sessionWrapper,"6500000000000000000",sessionGreet);
function initHelp(sessionId)
{

	global.sendreply(sessionId,{text:templateMessages.HELP_OPTIONS});
	global.session[sessionId].context.sub_context=LEVEL_1;
}

function handlePostback(Postback,sessionId)
{
	/*if(global.session[sessionId].context.sub_context===LEVEL_1)
	{
		handleMessage_1()

	}
	else if(global.session[sessionId].context.sub_context===LEVEL_2)
	{

	}*/

//	global.sendreply(sessionId,{text:templateMessages.HELP_OPTIONS});

}


var handleMessage_1=function(message,sessionId)
{


	if(_.intersection(message, ref_FAQ).length!==0)
	{
		global.sendreply(sessionId,{text:templateMessages.HELP_FAQ});
		global.session[sessionId].context.sub_context=LEVEL_2;

	}else if(_.intersection(message, ref_AboutUs).length!==0)
	{
		global.sendreply(sessionId,{text:templateMessages.HELP_ABOUT});
		 //global.session[sessionId].context.sub_context=null;

	}
	else if(_.intersection(message, ref_Contact).length!==0)
	{
		global.sendreply(sessionId,{text:templateMessages.HELP_CONTACT});
		//global.session[sessionId].context.sub_context=null;
	}
	else if(_.intersection(message, ['mwnu','menu','men','menus','main','mein','mains']).length!==0)
	{
		//global.session[sessionId].context.context=Contexts.CONTEXT_SESSION_GREET;
    	console.log(sessionGreet,'User entered Menu');
		//sessionGreet.showMenu(sessionId);
	}
	else
	{
		global.sendreply(sessionId,{text:"Please choose correct option or press 'menu' button at top to go to main menu"});
		initHelp(sessionId);
	}

};

var handleMessage_2=function(message,sessionId)
{


	if(_.intersection(message,['1','1.','supplier']).length!==0)//&&message.length===1)
	{
		//To reset the conversation
		global.sendreply(sessionId,{text:"You choose 1"});

	}

	else if(_.intersection(message,['2','2.','corporate']).length!==0)//&&message.length===1)
	{
		global.sendreply(sessionId,{text:"You choose 2"});

	}

	else if(_.intersection(message,['3','3.','network']).length!==0)//&&message.length===1)
	{
		global.sendreply(sessionId,{text:"You choose 3"});

	}

	else if(_.intersection(message,['4','4.','growth']).length!==0)//&&message.length===1)
	{
		global.sendreply(sessionId,{text:"You choose 4"});

	}
	else if(_.intersection(message,['5','5.','sample']).length!==0)//&&message.length===1)
	{
		global.sendreply(sessionId,{text:"You choose 5"});

	}
	else
	{
		global.session[sessionId].context.sub_context=LEVEL_1;
		handleMessage_1(message,sessionId);
	}

};

function handleMessage(message,sessionId)
{

	message=message.toLowerCase().split(" ");

	if(global.session[sessionId].context.sub_context===LEVEL_1)
	{
		handleMessage_1(message,sessionId);
	}
	else if(global.session[sessionId].context.sub_context===LEVEL_2)
	{
		handleMessage_2(message,sessionId);

	}
	else
	{

		//Unknown state. This condition should never occur
	}



	}


function handleFaq(sessionId,message)
{

}

var run=function (...arg)
{

	console.log(TAG," run");

	let sessionId=arg[0];
	//Reset the Context
	let pre_context=global.session[sessionId].context.context;
	global.session[sessionId].context.context={};
	global.session[sessionId].context.context=Contexts.CONTEXT_SESSION_HELP;
	global.session[sessionId].context.pre_context=pre_context;

	breadCrums.update_breadCrum(sessionId,2,"Help",run,sessionId);
	initHelp(sessionId);
};



module.exports={
		initHelp,
		handlePostback,
		handleMessage,
		run
};
