/*jshint esversion: 6 */



const Contexts=require('../Contexts.js');
const TAG="MENU FREE BIZ OPTION === ";
const sessionWrapper=require('../sessionWrapper');
const manipulateOutput=require('../manipulateOutput');
const breadCrums=require('../breadCrums');
//const templateMessages=require('../templateMessage');
//LEVEL_1 Cardview
const C_1_NAME='SESSION_FREEBIZTOOLS_CARDVIEW_1';
const C_1_Title='Please choose from the following options :';
const P_1_1='sessionFreeBizToolsadvertise';
const P_1_2='www.sample.com/create-catalog';
const C_1_1='http://clipart-library.com/image_gallery/225884.jpg';
const C_1_2='https://openclipart.org/download/248169/1462438854.svg';
const C_1_1_T=['List and advertise your products for free','Free professional catalogue creater'];
const C_1_1_P=[P_1_1,P_1_2];
const C_1_1_D=['postback','web_url'];
const C_1_1_I=[C_1_1,C_1_2];
const C_1_1_U=[C_1_1,C_1_2];

const LEVEL_1='LEVEL_1';
var handle_P_1_2=function (...arg)
{
	let postback=arg[0];
	let sessionId=arg[1];
	
	var reply={};	
	console.log(TAG," PB 2",arg);

	reply.text='You choose advertise';
	global.sendreply(sessionId,reply,true);
};


var handle_P_1_1=function (...arg)
{
	let postback=arg[0];
	let sessionId=arg[1];
	console.log(TAG," PB 1",arg);
	let applink=global.CONTEXTS[Contexts.CONTEXT_TEMPLATE_MESSAGE].supplierAppLink();
//	console.log(TAG," applink ",applink);
	manipulateOutput.getCardViewOutput("sample app for suppliers.",applink,function(finalOutput)
				{
				var reply={};
				reply.attachment=finalOutput;
				//console.log(JSON.stringify(finalOutput));
				global.sendreply(sessionId,reply,true);
		});

};

var showOptions=function(sessionId)
{
	var reply={};
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

		//global.sendreply(this.fbid,{text:"free option 2 "});3
		manipulateOutput.getCardViewOutput(C_1_Title,menu_data,function(finalOutput)
				{
				var reply={};
				reply.attachment=finalOutput;

				//console.log(JSON.stringify(finalOutput));
				global.sendreply(sessionId,reply,true);
		});


};



var run=function(sessionId)
{
	breadCrums.update_breadCrum(sessionId,2,"FREE TOOLS",run,sessionId);

	console.log(TAG,'run');
	let pre_context=global.session[sessionId].context.context;
	global.session[sessionId].context={};
	global.session[sessionId].context.pre_context=pre_context;
	global.session[sessionId].context.context=Contexts.CONTEXT_SESSION_FREE_BIZ_TOOL;
	global.session[sessionId].context.sub_context=LEVEL_1;
	global.POSTBACKS[P_1_1]=handle_P_1_1;
	global.POSTBACKS[P_1_2]=handle_P_1_2;

	showOptions(sessionId);
};

var handlePostback=function(postback,sessionId)
{
	//console.log(TAG,"Post back recieved");
	if(global.session[sessionId].context.sub_context==LEVEL_1)
	{
		handlePostback_Level_1(postback,sessionId)
	}
}

var handlePostback_Level_1=function(...arg)
{
	let postback=arg[0];
	let sessionId=arg[1];
	//console.log(TAG,"Post back __level1_recieved");
	
}

module.exports=
{

run,
handlePostback


};

