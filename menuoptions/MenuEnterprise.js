/*jshint esversion: 6 */
const TAG="MENU Enterprice === ";
// Import the Modules
const OPTIONS_TITLE='Please choose an option';

// Exporting prior to imorting anything. This will avoid problem of circular
// dependency




const manipulateOutput=require('../manipulateOutput');
const templateMessages=require('../templateMessages');
const breadCrums=require('../breadCrums');
const Contexts=require('../Contexts.js');




// END import Modules

// Sub-contects
const LEVEL_1='Enterprice_LEVEL_1';
const LEVEL_2='Enterprice_LEVEL_2';
// LEVEL_1 OPTIONS
// Convert this to cardview
// const BUTTON_OPTION_1='Complete marketing automation for your business';
// const BUTTON_OPTION_2='Book a Demo or Set a Meeting or Call us @ 9987660501';
// const BUTTON_OPTION_3='Click here for an automted email to our
// Representative';
// const BUTTONS_LEVEL_1=[BUTTON_OPTION_1,BUTTON_OPTION_2,BUTTON_OPTION_3];
/* link 1. growthmeetings.com/marketing-automation */

// LEVEL_1 Cardview
const C_1_Title='Please choose from the following options :';
const P_1_1='EnterPrise_POSTBACK_BOOK_DEMO';
const P_1_2='EnterPrise_POSTBACK_CALL_US';
const P_1_3='Enterprise_POSTBACK_EMAIL';
const C_1_1='https://openclipart.org/download/59881/ad-board.svg';
const C_1_2='http://clipart-library.com/image_gallery/49154.png';
const C_1_3='http://clipart-library.com/data_images/205359.png';
const C_1_1_T=['Complete marketing automation for your business','Book a Demo or Set a Meeting or Call us @ 9987660501','Send an automated email to our Representative'];
const C_1_1_P=[P_1_1,P_1_2,P_1_3];
const C_1_1_D=['postback','postback','postback'];
const C_1_1_I=[C_1_1,C_1_2,C_1_3];
const C_1_1_U=[C_1_1,C_1_2,C_1_3];



var showLevel_1=function(sessionId)
{
	var reply={};
		// Build the data for the menu
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

		// global.sendreply(this.fbid,{text:"free option 2 "});
		manipulateOutput.getCardViewOutput(C_1_Title,menu_data,function(finalOutput)
				{
				var reply={};
				reply.attachment=finalOutput;

				// console.log(JSON.stringify(finalOutput));
				global.sendreply(sessionId,reply,true);
				global.session[sessionId].context.sub_context=LEVEL_1;
		});

};

var handlePostback=function(postback,sessionId)
{
	if(global.session[sessionId].context.sub_context===LEVEL_1)
	{
		handlePostbackLevel_1(postback,sessionId);
	}

}

var handlePostbackLevel_1=function(postback,sessionId)
{/*
		let reply={};
		if(postback===P_1_1)
		{
			reply.text="You Choose automation option";
		}
		else if(postback===P_1_2)
		{
			reply.text="You Choose book demo and Call us";
		}
		else {
			reply.text="Sorry, I think you didn't choose options from above.<br>"
									+"Please choose correct option from above or press 'Menu' button at top.";

			// Incorrect option from the current sub_context
		}

		global.sendreply(sessionId,reply,true);
*/
}// end handlePostbackLevel_1


var run=function(sessionId)
{
	breadCrums.update_breadCrum(sessionId,2,"Enterprise",run,sessionId);
	console.log(TAG,'RUN');
	let pre_context=global.session[sessionId].context.context;
	global.session[sessionId].context={};
	global.session[sessionId].context.pre_context=pre_context;
	global.session[sessionId].context.context=Contexts.CONTEXT_SESSION_ENTERPRISE;
	showLevel_1(sessionId);


};

var switchContext=function(sessionId)
{
	if(Contexts.CONTEXT_SESSION_ENTERPRISE!==global.session[sessionId].context.context)
	{
	let pre_context=global.session[sessionId].context.context;
	global.session[sessionId].context={};
	global.session[sessionId].context.pre_context=pre_context;
	global.session[sessionId].context.context=Contexts.CONTEXT_SESSION_ENTERPRISE;
	}
	
};
var handleMessage=function(text,sessionId)
{
	var reply={};
	reply.text="Recieved";
	global.sendreply(sessionId,reply,true);


};


var handle_P_1_1=function(...arg)
{
	let postback=arg[0];
	let sessionId=arg[1];
	
	switchContext(sessionId);

	global.session[sessionId].context.sub_context=LEVEL_1;
	manipulateOutput.getButtonOutput("Click the button below to visit the page and and schedule a FREE DEMO",["Visit page"],["http://growthmeetings.com/marketing-automation/"],['web_url'],function(finalOutput)
			{
			let reply={};
			reply.attachment=finalOutput;
			global.sendreply(sessionId,reply,true);
			});

	

	
};

var handle_P_1_2=function(...arg)
{
	
	//Book a demo handler
	let postback=arg[0];
	let sessionId=arg[1];
	switchContext(sessionId);

	let reply={};
	reply.text=templateMessages.ENTERPRISE_BOOK_DEMO;
	global.sendreply(sessionId,reply,true);

	/*manipulateOutput.getButtonOutput("Click the button below to visit the page and and schedule a FREE DEMO",["Visit page"],["http://growthmeetings.com/marketing-automation/"],['web_url'],function(finalOutput)
			{
			let reply={};
			reply.attachment=finalOutput;
			global.sendreply(sessionId,reply,true);
			});
	*/
};


var handle_P_1_3=function(...arg)
{
	
	//send automated email handler
	//console.log(TAG, "HERE");
	let postback=arg[0];
	let sessionId=arg[1];
	switchContext(sessionId);

	let reply={};
	reply.text=templateMessages.ENTERPRISE_AUTOMATED_EMAIL;
	global.sendreply(sessionId,reply,true);


	
};

global.POSTBACKS[P_1_1]=handle_P_1_1;
global.POSTBACKS[P_1_2]=handle_P_1_2;
global.POSTBACKS[P_1_3]=handle_P_1_3;

module.exports=
{

run,
handlePostback,
handleMessage

};
