/*jshint esversion: 6 */
const TAG='SESSION Buyer ==== ';
//console.log(TAG,' Loading modules');
const Contexts=require('./Contexts');
//const appjs=require('./app');
const UserSessions1 = require('./UserSessions') ;
const manipulateOutput=require('./manipulateOutput');
const sessionGreet=require('./sessionGreet');
const breadCrums=require('./breadCrums');



const initString='Buyer session';
const POSTBACK_FREE_TOOLS='postback_freetools';
const POSTBACK_SOFTWARES_SALES='postback_softwares';
const BUTTON_OPTION_LEVEL_1=['OP 1','OP 2'];
const POSTBACK_BUTTON_LEVEL_1=[POSTBACK_FREE_TOOLS,POSTBACK_SOFTWARES_SALES];

/*
 * Buttons data for user to be shown when user clicks FREE TOOLS
 * */
const OPTIONS_TITLE_FREE_TOOLS='What would you like to do?';
const BUTTON_OPTION_3='1a.Create Product catalog';
const BUTTON_OPTION_4='2a.hare your Products';
const BUTTON_OPTION_5='3a.View product leads';
const BUTTONS_LEVEL_2_FREE_TOOLS_OPTION=[BUTTON_OPTION_3,BUTTON_OPTION_4,BUTTON_OPTION_5];

const POSTBACK_FT_O2='POSTBACK_share_prod';
const POSTBACK_FT_O3='POSTBACK_view_leads';
const POSTBACK_LEVEL_2_FREE_TOOLS_OPTION=["www.sample.com/create-catalog",POSTBACK_FT_O2,POSTBACK_FT_O3];
const POSTBACK__LEVEL_2_BUTTONS_TYPE=['web_url','postback','postback'];
const SUB_CONTEXT_1='SUB_CONTEXT_1';
const SUB_CONTEXT_2='SUB_CONTEXT_2';

const OPTIONS_TITLE='Please choose an option (Buyer)';

function initSession(sessionId)
{
	this.fbid=global.session[sessionId].fbid;
	appjs.mybot.getProfile(this.fbid, (err, profile) => {
	if (err) {throw err;}
		var init= "Hello "+ profile.first_name+ " "+ profile.last_name+ ",\n";
		global.sendreply(this.fbid,{text:init+initString});

		console.log(TAG,"Context_____wwww___ is :",global.session[sessionId].context.context);

		global.session[sessionId].context.sub_context=SUB_CONTEXT_1;
		manipulateOutput.getButtonOutput(OPTIONS_TITLE,BUTTON_OPTION_LEVEL_1,POSTBACK_BUTTON_LEVEL_1,function(finalOutput)
				{
				var reply={};
				reply.attachment=finalOutput;
				global.sendreply(this.fbid,reply);
				});

	});
}

function handleMessage(text,sessionId)
{

}
function handlePostback(postback,sessionId)
{

this.fbid=global.session[sessionId].fbid;
	console.log(TAG," handlepostback=== " ,postback);
	if(postback===sessionGreet.POSTBACK_GREET_Buyer)
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
		global.sendreply(this.fbid,{text:" You choose Buyer software sales "});
		console.log(TAG,"user choose software sales");
	}
	else if(postback===POSTBACK_FT_O2)
	{
	global.sendreply(this.fbid,{text:"Buyer option 2 "});
		console.log(TAG,"user choose share products");
	}
	else if(postback===POSTBACK_FT_O3)
	{
		global.sendreply(this.fbid,{text:"Buyer option 3 "});
		console.log(TAG,"user choose view product lead");

	}
	else
	{

		global.sendreply(this.fbid,{text:"Buyer please enter correct option"});
		console.log(TAG, "INCORRECT BUTTON IN CONTEXT");

	}
}


var run=function (...arg)
{
	let sessionId=arg[0];

	//Reset the Context
	global.session[sessionId].context.context={};
	global.session[sessionId].context.context=Contexts.CONTEXT_SESSION_BUYER;


	console.log(TAG," run");
	breadCrums.update_breadCrum(sessionId,2,"Buyer",run,sessionId);
	//initSession(sessionId);
/*	title:column1[i][0],
	image_url: column1[i][1].replace(/ /g, '%20'),
	item_url: column1[i][2],
	type: column1[i][3],
    payload: column1[i][4]*/
	//data to be sent
	let Title='Sample title';
	let image_url='http://19966-presscdn-0-84.pagely.netdna-cdn.com/wp-content/uploads/2016/12/the-best-2016.png';
	let item_url="http://sample.com/";
	let type='postback';
	let payload='yo yo';
	let temp=[Title,image_url,item_url,type,payload];
	var data=[temp,temp,temp];

	//global.sendreply(this.fbid,{text:"free option 2 "});
	manipulateOutput.getCardViewOutput("MAIN TITLE",data,function(finalOutput)
			{
			var reply={};
			reply.attachment=finalOutput;

			//console.log(JSON.stringify(finalOutput));
			global.sendreply(sessionId,reply,true);
	});











};

module.exports=
{		handleMessage,
		handlePostback:handlePostback,
		run
};
