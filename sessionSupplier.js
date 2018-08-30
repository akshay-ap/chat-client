/*jshint esversion: 6 */
const TAG='SESSION SUPPLIER ==== ';
//console.log(TAG,' Loading modules');
const Contexts=require('./Contexts');
//const appjs=require('./app');
const UserSessions1 = require('./UserSessions') ;
const manipulateOutput=require('./manipulateOutput');
const sessionGreet=require('./sessionGreet');
const breadCrums=require('./breadCrums');



const initString='from helping you gain sales both offline to '+
				'e-commerce to mobile apps to Dashboards to track'+
				'your sales and Marketing efforts.\n '+
				'We help you so that yo can focus on your manufacturing';
const POSTBACK_FREE_TOOLS='postback_freetools';
const POSTBACK_SOFTWARES_SALES='postback_softwares';
const BUTTON_OPTION_LEVEL_1=['FREE TOOLS','Softwares-Sales,Marketing,ERP'];
const POSTBACK_BUTTON_LEVEL_1=[POSTBACK_FREE_TOOLS,POSTBACK_SOFTWARES_SALES];

/*
 * Buttons data for user to be shown when user clicks FREE TOOLS
 * */
const OPTIONS_TITLE_FREE_TOOLS='What would you like to do?';
const BUTTON_OPTION_3='Create Product catalog';
const BUTTON_OPTION_4='Share your Products';
const BUTTON_OPTION_5='View product leads';
const BUTTONS_LEVEL_2_FREE_TOOLS_OPTION=[BUTTON_OPTION_3,BUTTON_OPTION_4,BUTTON_OPTION_5];

const POSTBACK_FT_O2='POSTBACK_share_prod';
const POSTBACK_FT_O3='POSTBACK_view_leads';
const POSTBACK_LEVEL_2_FREE_TOOLS_OPTION=["www.sample.com/create-catalog",POSTBACK_FT_O2,POSTBACK_FT_O3];
const POSTBACK__LEVEL_2_BUTTONS_TYPE=['web_url','postback','postback'];


const OPTIONS_TITLE='Please choose an option';

function initSession(sessionId)
{
	this.fbid=global.session[sessionId].fbid;
	appjs.mybot.getProfile(this.fbid, (err, profile) => {
	if (err) {throw err;}
		var init= "Hello "+ profile.first_name+ " "+ profile.last_name+ ",\n";
		global.sendreply(this.fbid,{text:init+initString});
		//console.log(TAG,"Context is :",global.session[sessionId].context.context); 
		manipulateOutput.getButtonOutput(OPTIONS_TITLE,BUTTON_OPTION_LEVEL_1,POSTBACK_BUTTON_LEVEL_1,function(finalOutput)
				{
				var reply={};
				reply.attachment=finalOutput;
				global.sendreply(this.fbid,reply);
				});
		//console.log(TAG,"Context is :",global.session[sessionId].context.context); 
		
	});
}

function handleMessage(text,sessionId)
{

}
function handlePostback(postback,sessionId)
{
this.fbid=global.session[sessionId].fbid;
	console.log(TAG," handlepostback=== " ,postback);
	if(postback===sessionGreet.POSTBACK_GREET_SUPPLIER)
	{
		initSession(sessionId);
	}
	else if(postback===POSTBACK_FREE_TOOLS)
	{
		//global.sendreply(this.fbid,{text:"free option 2 "});
		manipulateOutput.getButtonOutput(OPTIONS_TITLE,BUTTONS_LEVEL_2_FREE_TOOLS_OPTION,POSTBACK_LEVEL_2_FREE_TOOLS_OPTION,POSTBACK__LEVEL_2_BUTTONS_TYPE,function(finalOutput)
				{
				var reply={};
				reply.attachment=finalOutput;
				global.sendreply(this.fbid,reply);
		});
	}
	else if(postback===POSTBACK_SOFTWARES_SALES)
	{
		global.sendreply(this.fbid,{text:" You choose Supplier software sales "});
		console.log(TAG,"user choose software sales");
	}
	else if(postback===POSTBACK_FT_O2)
	{
	global.sendreply(this.fbid,{text:"Supplier option 2 "});
		console.log(TAG,"user choose share products");
	}
	else if(postback===POSTBACK_FT_O3)
	{
		global.sendreply(this.fbid,{text:"Supplier option 3 "});
		console.log(TAG,"user choose view product lead");	
	}
	else
	{
		global.sendreply(this.fbid,{text:"Supplier please enter correct option"});
		console.log(TAG, "INCORRECT BUTTON IN CONTEXT");
	}
}


var run=function (...arg)
{	
	let sessionId=arg[0];

	console.log(TAG," run");

	//Reset the Context
	global.session[sessionId].context.context={};
	global.session[sessionId].context.context=Contexts.CONTEXT_SESSION_SUPPLIER;
	breadCrums.update_breadCrum(sessionId,2,"Supplier",run,sessionId);
	initSession(sessionId);
};

module.exports=
{		handleMessage,
		handlePostback:handlePostback,
		run:run
};