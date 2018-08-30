const TAG='FEEDBACK === ';

const Config= require('./config');
const Contexts=require('./Contexts');
const templateMessages=require('./templateMessages');

const P_1_1="S_FB_1_FBR_Y";
const P_1_2="S_FB_1_FBR_N";

var handle_P_1_1=function(...arg)
{
	let postback= arg[0];
	let sessionId=arg[1];
	
}
var handle_P_1_2=function(...arg)
{
	let postback= arg[0];
	let sessionId=arg[1];
	
}

var handlePostback=function(postback,sessionId)
{
	
}

var handleMessage=function(postback,sessionId)
{
	
}

var run =function(...arg)
{
	//Get the sessionId
	let sessionId=arg[0];
	global.POSTBACKS[P_1_1]=handle_P_1_1;
	global.POSTBACKS[P_1_1]=handle_P_1_2;
}
module.exports=
{
		handlePostback,
		handleMessage,
		run
};