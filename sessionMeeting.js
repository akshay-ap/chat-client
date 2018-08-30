/*jshint esversion: 6 */
const breadCrums=require('./breadCrums');
const Contexts=require('./Contexts');
const TAG='SESSION MEETING ==== ';
function handlePostback(postback,sessionId)
{

}
/*
function run(sessionId)
{
	breadCrums.update_breadCrum(sessionId,2,"Meeting");

	console.log(TAG," run");

}*/



var run=function (...arg)
{
	let sessionId=arg[0];
	
	//Reset the Context
	global.session[sessionId].context.context={};
	global.session[sessionId].context.context=Contexts.CONTEXT_SESSION_MEETING;

	console.log(TAG," run");
	breadCrums.update_breadCrum(sessionId,2,"Buyer",run,sessionId);

};

module.exports=
{
		handlePostback:handlePostback,
		run
};