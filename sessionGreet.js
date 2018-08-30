/*jshint esversion: 6 */
const Contexts=require('./Contexts');
const templateMessages=require('./templateMessages');

//This module maintains UserSessions. Data Exists as long as server is running.
//Note: Can occupy too much space if used excessively
//const appjs=require('./app');
const TAG="sessionGreet";
// [Start Greeting message]
var arrayGreetings=['hi','hello','sample','hi es','bonjour','good morning','morning','hellos','helois','Hi','Hello','Hey'];
var arrayGreetResponse=['Hello','Welcome to sample','This is sample','Hey'];
var arrayGreetResponse2=['Who are you?','Choose any one option','Select a category from the following:'];
var arrayGreetOptionResponse=['1.Buyer','2.Seller','3.Help','4.Meetings'];
const arrayMenu=['menu','MENU','Menu'];

arrayGreetOptionResponse=arrayGreetOptionResponse.join("\n");

const breadCrums=require('./breadCrums');
// Sessions
const sessionBuyer=require('./sessionBuyer');
const sessionMeeting=require('./sessionMeeting');
const sessionHelp=require('./sessionHelp');
//const sessionSeller=require('./sessionBuyer');
const sessionSupplier=require('./sessionSupplier');
const sessionDistributer=require('./sessionDistributer');
const sessionRegistration=require('./userRegistration');
// [END GREETING MESSAGE]
const manipulateOutput=require('./manipulateOutput');
//const sessionWrapper=require('./sessionWrapper');
const greetUser='Welcome to sample';

//const sessionWrapper=require('./sessionWrapper');
//console.log(sessionWrapper);
// This module will handle the functionality to reply from the context
var arrayGreetOption1=['2','Seller','sell'];
var arrayGreetOption2=['1','Buyer','buy'];
var arrayGreetOption3=['3','help','helpr'];
var arrayGreetOption4=['4','meeting','meetings'];
var _ = require('underscore');
//var mapQuery=require('./mapQuery');

const POSTBACK_GREET_SUPPLIER='greetSupplier';
const POSTBACK_GREET_BUYER='greetBuyer';
const POSTBACK_GREET_DISTRIBUTER='greetDistributer';
const POSTBACK_GREET_MEETING='greetMeeting';
const POSTBACK_GREET_HELP='greetHelp_1_4';

const POSTBACK_GREET_OPTION1='option1';
const POSTBACK_GREET_OPTION2='option2';


const POSTBACK_GREET_FREE_BIZ_TOOLS='greetFreeBizTools_1_3';
const POSTBACK_GREET_ENTERPRISE='greetEnterPrise_1_2';
const POSTBACK_GREET_INDIVIDUAL='greetIndividual_1_1';
// const GREET_OPTION3='option3';
//let image_url='http://19966-presscdn-0-84.pagely.netdna-cdn.com/wp-content/uploads/2016/12/the-best-2016.png';
let button_click_image='#';

const C_1_1_P=[POSTBACK_GREET_INDIVIDUAL,POSTBACK_GREET_ENTERPRISE,POSTBACK_GREET_FREE_BIZ_TOOLS,POSTBACK_GREET_HELP];
const C_1_1_T=['Individual','EnterPrise','FREE BIZ TOOLS','Help/Info'];
const C_1_1_D=['postback','postback','postback','postback'];
const C_1_1_I=[button_click_image,button_click_image,button_click_image,button_click_image];
const C_1_1_U=["https://openclipart.org/download/5578/msewtz-Business-Person.svg","https://openclipart.org/download/242308/1456343266_vector_65_02.svg","https://openclipart.org/download/196245/Shed.svg","https://openclipart.org/download/166905/Help-Desk.svg"];
//Build the data for the menu
var menu_data=[];
	for(var i=0;i<C_1_1_I.length;i++)
	{
		let temp=[];
		temp.push(C_1_1_T[i]);
		temp.push(C_1_1_U[i]);
		temp.push(C_1_1_I[i]);
		temp.push(C_1_1_D[i]);
		temp.push(C_1_1_P[i]);
		menu_data.push(temp);
	}



	// manipulateOutput.getButtonOutput(templateMessages.GREET_BUTTONS_MAIN_MENU,BUTTON_OPTIONS_MENU,BUTTON_PB_MENU,function(finalOutput)
	// 		{
	// 		var reply={};
	// 		reply.attachment=finalOutput;
	// 		global.sendreply(sessionId,reply,true);
	// 		});

	var showMenu=function(...arg)
	{
		//Show main menu to user
		let sessionId=arg[0];
		//Reset the context
		let pre_context=global.session[sessionId].context.context;
		global.session[sessionId].context={};
		global.session[sessionId].context.pre_context=pre_context;
		global.session[sessionId].context.context=Contexts.CONTEXT_SESSION_GREET;

		//arg[0]=sessionId
			breadCrums.clear(sessionId);
			//UPADATE BREAD CRUM
			breadCrums.update_breadCrum(sessionId,1,"MENU",showMenu,sessionId);

			//global.sendreply(this.fbid,{text:"free option 2 "});
			manipulateOutput.getCardViewOutput(templateMessages.GREET_BUTTONS_MAIN_MENU,menu_data,function(finalOutput)
					{
					var reply={};
					reply.attachment=finalOutput;

					//console.log(JSON.stringify(finalOutput));
					global.sendreply(sessionId,reply,true);
			});

	};

var handle_P_1_1=function(...arg)
{
	let sessionId=arg[1];
	let postback=arg[0];
	console.log(TAG,postback,'handling through handler');
	//Individual postback handler
	global.CONTEXTS[Contexts.CONTEXT_SESSION_INDIVIDUAL].run(sessionId);

};
var handle_P_1_2=function(...arg)
{
	let sessionId=arg[1];
	let postback=arg[0];
	//console.log(TAG,postback,'handling through handler');
	//Enterprise postback handler
	  global.CONTEXTS[Contexts.CONTEXT_SESSION_ENTERPRISE].run(sessionId);

};
var handle_P_1_3=function(...arg)
{
	let sessionId=arg[1];
	let postback=arg[0];
	//console.log(TAG,postback,'handling through handler');
	//Free biz tool handler
	global.CONTEXTS[Contexts.CONTEXT_SESSION_FREE_BIZ_TOOL].run(sessionId);

};
var handle_P_1_4=function(...arg)
{
	let sessionId=arg[1];
	let postback=arg[0];
//	console.log(TAG,postback,'handling through handler');
	//Help handler
	console.log(TAG,global.session[sessionId].context.context);
	global.session[sessionId].context.context=Contexts.CONTEXT_SESSION_HELP;
	console.log(TAG,global.session[sessionId].context.context);
	sessionHelp.run(sessionId);
};
function handlePostback(postback,sessionId)
{
	console.log(TAG," handleing postback ", postback);
	/*
	 * GREET_OPTION 1 & 2 needed as only 3 buttons can be sent at a time. So,
	 * grouping the options together
	 *
	 *
	 */

  if(postback===POSTBACK_GREET_ENTERPRISE)
	{
	  global.CONTEXTS[Contexts.CONTEXT_SESSION_ENTERPRISE].run(sessionId);
	}
	else if(postback===POSTBACK_GREET_INDIVIDUAL)
	{

		global.CONTEXTS[Contexts.CONTEXT_SESSION_INDIVIDUAL].run(sessionId);
	}
	else if(postback===POSTBACK_GREET_FREE_BIZ_TOOLS)
	{

		global.CONTEXTS[Contexts.CONTEXT_SESSION_FREE_BIZ_TOOL].run(sessionId);
	}
	else if(postback===POSTBACK_GREET_HELP)
	{
		console.log(TAG,global.session[sessionId].context.context);
		global.session[sessionId].context.context=Contexts.CONTEXT_SESSION_HELP;
		console.log(TAG,global.session[sessionId].context.context);
		sessionHelp.run(sessionId);

	}
	else
	{
		console.log(TAG,"Incorrect postback response in context");
	}
}

function handleGreet(text,sessionId)
{// [Start handle greet]
console.log(TAG,"TEXT RECEVIED" ,text);
text= text.toLowerCase();
text=text.split(' ');


if(_.intersection(text,arrayMenu).length!==0&&text.length===1)
{
	showMenu(sessionId);
}

else if(_.intersection(text,arrayGreetings).length!==0&&text.length===1)
{
	console.log(TAG,"Sending Hi");

			var init= "Hello "+ global.session[sessionId].first_name +",\n";
			global.sendreply(sessionId,{text:init+templateMessages.GREET_TITLE_MENU});



}
else if(_.intersection(text, arrayGreetOption1).length!==0)
	{

	console.log(TAG,"arrayGreetOption3");

	// User Choose option 1
	// global.session[sessionId].context.nextReplyFromContext=false;
/*
 * mapQuery.queryArrayToDataBase(mapQuery.queryCategories1,['category','image'],function(err,result){
 * if (err) {throw err;} // console.log('in cardvew fromation');
 * //console.log(result); //console.log('========in cardvew fromation');
 * manipulateOutput.getCardViewOutput(result,function(finalOutput) {
 * global.session[sessionId].context.reply='attachment'; //return
 * callback(finalOutput);
 * global.sendreply(sessionId,{attachment:finalOutput});
 *
 * }); //console.log(result); });//end map Queries
 */
}
else if(_.intersection(text, arrayGreetOption2).length!==0)
	{
	console.log(TAG,"arrayGreetOption3");

	/*
	 * //User Choose option2
	 * global.session[sessionId].context.nextReplyFromContext=false;
	 *
	 * mapQuery.queryArrayToDataBase(mapQuery.queryCategories1,['category','image'],function(err,result){
	 * if (err){ throw err;} // console.log('in cardvew fromation');
	 * //console.log(result); //console.log('========in cardvew fromation');
	 * manipulateOutput.getCardViewOutput(result,function(finalOutput) {
	 *
	 * global.session[sessionId].context.reply='attachment'; //return
	 * callback(finalOutput);
	 * global.sendreply(sessionId,{attachment:finalOutput});
	 * }); //console.log(result); });//end map Queries
	 */

	}
else if(_.intersection(text, arrayGreetOption3).length!==0)
	{
	console.log(TAG,"arrayGreetOption3");
	/*
	 * //User Choose option3
	 *
	 * global.session[sessionId].context.help=true;
	 * global.session[sessionId].context.nextReplyFromContext=true;
	 *
	 *
	 * global.sendreply(sessionId,{text:'1.FAQ 2.CALL
	 * 3.Email'}); } else if(_.intersection(text, arrayGreetOption4).length!==0)
	 * {//User Choose option4
	 * global.session[sessionId].context.nextReplyFromContext=false;
	 * global.sendreply(sessionId,{text:'Set a meeting'});
	 */	}

else
{
	//global.sendreply(sessionId,{text:'Say \'hi\' to get started.'});

	/*
	 *
	 */
	var reply={};
	reply.attachment="Type 'menu' to see the menu";
	global.sendreply(sessionId,reply,true);
	console.log("Type 'menu' to see the menu");
}

}// [End handle greet]


var run=function (...arg)
{
	console.log(TAG," run");


	let sessionId=arg[1];
	let text = arg[0];
	console.log(TAG,"__________Ssdfdfd ",sessionId);
	//Reset the Context
	var pre=global.session[sessionId].context.context;
	global.session[sessionId].context.context={};
	global.session[sessionId].context.context=Contexts.CONTEXT_SESSION_GREET;
	global.session[sessionId].context.pre_context=pre;

	//Clear pervious breadcrums
	breadCrums.clear(sessionId);
	//UPADATE BREAD CRUM
	breadCrums.update_breadCrum(sessionId,1,"MENU",showMenu,sessionId);

	//handleGreet(text,sessionId);
};



//add postback handlers
global.POSTBACKS[POSTBACK_GREET_INDIVIDUAL]=handle_P_1_1;
global.POSTBACKS[POSTBACK_GREET_ENTERPRISE]=handle_P_1_2;
global.POSTBACKS[POSTBACK_GREET_FREE_BIZ_TOOLS]=handle_P_1_3;
global.POSTBACKS[POSTBACK_GREET_HELP]=handle_P_1_4;




global.rungreet=function(sessionId,message)
{

	run(message,sessionId);
};

module.exports={
		arrayGreetings,
		arrayGreetResponse,
		arrayGreetResponse2,
		arrayGreetOptionResponse,
		handleMessage:handleGreet,
		handlePostback,

		POSTBACK_GREET_SUPPLIER,
		POSTBACK_GREET_BUYER,
		POSTBACK_GREET_DISTRIBUTER,
		POSTBACK_GREET_MEETING,
		POSTBACK_GREET_HELP,
		
		showMenu,run
};

//module.exports.run=run;
