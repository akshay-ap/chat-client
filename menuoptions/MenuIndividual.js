/*jshint esversion: 6 */
/* jshint latedef:nofunc */

const TAG="MENU Individual === ";

//Import the Modules
const Contexts=require('../Contexts.js');
const sessionWrapper=require('../sessionWrapper');
const POSTBACK_LEVEL_1_BUTTONS_TYPE=['postback','postback','postback'];

const OPTIONS_TITLE='Please choose an option';
const manipulateOutput=require('../manipulateOutput');
const templateMessages=require('../templateMessages');
const breadCrums=require('../breadCrums');
const sessionBuyer=require('../sessionBuyer');
const sessionMeeting=require('../sessionMeeting');
const sessionHelp=require('../sessionHelp');
const sessionGreet=require('../sessionGreet');
const sessionSupplier=require('../sessionSupplier');
const sessionDistributer=require('../sessionDistributer');
const sessionRegistration=require('../userRegistration');
// END import Modules

//console.log(templateMessages);


//LEVEL_1 DETAILS
//TITLE
const T_1='Are you Looking for National or international Sales/Servcies';
//Buttons
const B_1_1='National';
const B_1_2='International';
//Post Back
const PB_B_1_1='POSTBACK_1_1';
const PB_B_1_2='POSTBACK_1_2';
//Show Store the above in array
const B1_1=[B_1_1,B_1_2];
const P1_1=[PB_B_1_1,PB_B_1_2];
//END LEVEL_1

//LEVEL_2 DETAILS
//Title
const T_2='Please choose from the following options';
//Buttons
const B_2_1='CFA/Distributor/Wholesaler';
const B_2_2='Trader/Retailer';
const B_2_3='Manufacturer';
const B_2_4='Software Tools';

//Post Back
const PB_B_2_1='PB_B_2_1';
const PB_B_2_2='PB_B_2_2';
const PB_B_2_3='PB_B_2_3';
const PB_B_2_4='PB_B_2_4';

//Show Store the above in array
const B2_2=[B_2_1,B_2_2,B_2_3,B_2_4];
const P2_2=[PB_B_2_1,PB_B_2_2,PB_B_2_3,PB_B_2_4];
//END LEVEL_2

//LEVEL_3 DETAILS
//Title
const T_3='sample helps you to add more products with better margins to your existing assortments.';
//Buttons
const B_3_1='Need help in exports and imports?';
const B_3_2='FREE BIZ TOOLS';
const B_3_3='Set Metting';
const B_3_4='Find products';
const B_3_5='Partner with US';
//Post Back
const PB_B_3_1='PB_B_3_1';
const PB_B_3_2='PB_B_3_2';
const PB_B_3_3='PB_B_3_3';
const PB_B_3_4='PB_B_3_4';
const PB_B_3_5='PB_B_3_5';
//Show Store the above in array

//Different Combinations at level 3

//For CFA/Distributor/Wholesaler
const B3_1=[B_3_1,B_3_2,B_3_3,B_3_4,B_3_5];
const P3_1=[PB_B_3_1,PB_B_3_2,PB_B_3_3,PB_B_3_4,PB_B_3_5];

//For Trader/Retailer
const B3_2=[B_3_1,B_3_2,B_3_4,B_3_5];
const P3_2=[PB_B_3_1,PB_B_3_2,PB_B_3_4,PB_B_3_5];

//For Manufacturer
const B3_3=[B_3_1,B_3_2,B_3_3];
const P3_3=[PB_B_3_1,PB_B_3_2,PB_B_3_3];

//For sotware tools
const B3_4=[B_3_1,B_3_2,B_3_3];
const P3_4=[PB_B_3_1,PB_B_3_2,PB_B_3_3];
//END LEVEL_3



const LEVEL_1='sessionIndividual_1';
const LEVEL_2='sessionIndividual_2';
const LEVEL_3='sessionIndividual_3';


var showMenuLevel_1=function(sessionId)
{
	/*
	 * Shows user :
	 * 	Buttons : national/internaltion option
	 * 
	 * */
	global.session[sessionId].context.sub_context=LEVEL_1;
	manipulateOutput.getButtonOutput(T_1,B1_1,P1_1,function(finalOutput)
			{
			var reply={};
			reply.attachment=finalOutput;
			//console.log(TAG,"---------------");
			global.sendreply(sessionId,reply,true);
			});
};



var showMenuLevel_2=function(sessionId)
{
	/* Shows user 
	 * 'CFA/Distributor/Wholesaler'
	 * 'Trader/Retailer'
	 * 'Manufacturer'
	 * 'Software Tools'
	 * */
	global.session[sessionId].context.sub_context=LEVEL_2;
	manipulateOutput.getButtonOutput(T_2,B2_2,P2_2,function(finalOutput)
			{
			var reply={};
			reply.attachment=finalOutput;
			global.sendreply(sessionId,reply,true);
			});
};


var showMenuLevel_3=function(type,sessionId)
{
	/*
	 * 
	 * */
	global.session[sessionId].context.sub_context=LEVEL_3;
	//Resolve which type of button has been pressed by user: 1, 2, 3 or 4
	let B=[],P=[];
	
	if(type===1){B=B3_1;P=P3_1;}
	else if (type===2){B=B3_2;P=P3_2;}
	else if(type===3){B=B3_3;P=P3_3;}
	else if(type===4){B=B3_4;P=P3_4;}
	manipulateOutput.getButtonOutput(T_3,B,P,function(finalOutput)
			{
			var reply={};
			reply.attachment=finalOutput;
			global.sendreply(sessionId,reply,true);
			});
};




var handlePostback_1=function(postBack,sessionId,isValid)
{
	if(isValid===true)
	{
	let reply={};
	reply.text=templateMessages.GENERAL_OPTION;
	global.sendreply(sessionId,reply,true);
	}
	
	//Used if else for future modification purposes. Else can be wrapped in a single statment
	global.session[sessionId].context.sub_context_1=postBack;
	if(postBack===PB_B_1_1)
	{
		showMenuLevel_2(sessionId);
	}
	else if(postBack===PB_B_1_2)
	{
		showMenuLevel_2(sessionId);
	}
	else
	{
		//Unexpected post-back from user.	
		let reply={};
		reply.text=templateMessages.UNDEFINED_POSTBACK_FROM_USER;
		global.sendreply(sessionId,reply,true);
	}
};


var handlePostback_2=function(postBack,sessionId,isValid)
{
	
	global.session[sessionId].context.sub_context_2=postBack;

	if(postBack===PB_B_2_1)
	{
		showMenuLevel_3(1,sessionId);
	}
	else if(postBack===PB_B_2_2)
	{
		showMenuLevel_3(2,sessionId);
	}
	else if(postBack===PB_B_2_3)
	{
		showMenuLevel_3(3,sessionId);
	}
	else if(postBack===PB_B_2_4)
	{
		showMenuLevel_3(4,sessionId);
	}
	
	else
	{
		/* Unexpected button press in this context
		 * Go to Level 2 and check if user pressed any button of level 1.
		 * */
		handlePostback_1(postBack,sessionId,false);

	}
	
	
};

var applinkCardView=function(postback,sessionId)
{
	let applink=templateMessages.applink();
	console.log(TAG," applink ",applink);
	manipulateOutput.getCardViewOutput("Expoally app.",applink,function(finalOutput)
				{
				var reply={};
				reply.attachment=finalOutput;
				//console.log(JSON.stringify(finalOutput));
				global.sendreply(sessionId,reply,true);
		});

};


var handlePostback_3=function(postBack,sessionId)
{	
	let reply={};
	
	global.session[sessionId].context.sub_context_3=postBack;
	if(postBack===PB_B_3_1)
	{
		console.log(TAG,"----");
		//reply.text=templateMessages.HELP_OPTION;
		reply.text=templateMessages.HELP_OPTIONS;
		global.sendreply(sessionId,reply,true);
		
	}
	else if(postBack===PB_B_3_2)
	{
		
		//FreeBiz Tools....
		/*redirect user to *free biz tools sesison*/
		console.log(global.CONTEXTS[Contexts.CONTEXT_SESSION_FREE_BIZ_TOOL]);
		global.CONTEXTS[Contexts.CONTEXT_SESSION_FREE_BIZ_TOOL].run(sessionId);
	}
	else if(postBack===PB_B_3_3)
	{
		reply.text='3';
		global.sendreply(sessionId,reply,true);

	}
	
	else if(postBack===PB_B_3_5)
	{
		reply.text="ee";
		reply.text=templateMessages.INDIVIDUAL_SET_MEETING;
		global.sendreply(sessionId,reply,true);

	}
	else
	{
		/* Unexpected button press in this context
		 * Go to Level 2 and check if user pressed any button of level 2.
		 * */
		handlePostback_2(postBack,sessionId);
		return;
	}

};




var handlePostback=function(postBack,sessionId,isValid)
{
	if(global.session[sessionId].context.sub_context===LEVEL_1)
	{
		handlePostback_1(postBack,sessionId,true);
	}
	else if(global.session[sessionId].context.sub_context===LEVEL_2)
	{
		handlePostback_2(postBack,sessionId,true);
	}
	else if(global.session[sessionId].context.sub_context===LEVEL_3)
	{
		handlePostback_3(postBack,sessionId,true);
	}
};




var handleMessage=function(text,sessionId)
{
	if(text==='menu'||text==='Menu')
	{
		sessionGreet.showMenu(sessionId);
	}
	if(global.session[sessionId].context.sub_context===PB_B_1_1)
	{
		console.log(TAG,"MESSAGE AT LEVEL 1");
	}
	else if(global.session[sessionId].context.sub_context===PB_B_1_1)
	{
		console.log(TAG,"MESSAGE AT LEVEL 2");

	}
	else if(global.session[sessionId].context.sub_context===PB_B_1_1)
	{
		console.log(TAG,"MESSAGE AT LEVEL 3");

	}
};

var handle_PB_B_3_3=function(postback,sessionId)
{
	//Handler for set meetings.

	let reply={};
	reply.text=templateMessages.INDIVIDUAL_SET_MEETING;
	global.sendreply(sessionId,reply,true);

};

var handle_PB_B_3_5=function(postback,sessionId)
{
	//Handler for partner with us.
	let reply={};
	reply.text=templateMessages.INDIVIDUAL_PARTNER_WITH_US;
	global.sendreply(sessionId,reply,true);
};
var run=function(sessionId)
{
	breadCrums.update_breadCrum(sessionId,2,"INDIVIDUAL",run,sessionId);

	console.log(TAG,'run');
	let pre_context=global.session[sessionId].context.context;
	global.session[sessionId].context={};
	global.session[sessionId].context.pre_context=pre_context;
	global.session[sessionId].context.context=Contexts.CONTEXT_SESSION_INDIVIDUAL;
	showMenuLevel_1(sessionId);
};


global.POSTBACKS[PB_B_3_4]=applinkCardView;
global.POSTBACKS[PB_B_3_5]=handle_PB_B_3_5;
global.POSTBACKS[PB_B_3_3]=handle_PB_B_3_3;

module.exports=
{
		
run,
handlePostback,
handleMessage


};