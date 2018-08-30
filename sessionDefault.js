/*jshint esversion: 6 */

const TAG = 'sesionDefault.js';
const sessionGreet=require('./sessionGreet');
const Contexts=require('./Contexts');
const breadCrums=require('./breadCrums');

//console.log(TAG,"===",sessionGreet);
var run =function(...arg)
{	var text=null;

let payload=arg[0];
let sessionId=arg[1];
if(arg.length==3)
	{
	sessionGreet.showMenu(sessionId);
	return ;
	}
console.log(TAG, "STARTING RUN");
	try {
		console.log(TAG+" Text ", payload.message.text);
	      /* continue as normal */
	    text=payload.message.text;
	  } catch (err) {
	    console.log("Error no message peresnt");
	  }
	if(text!==null)
	{
		global.session[sessionId].context.context=Contexts.CONTEXT_SESSION_DEFAULT;
		global.rungreet(sessionId,text);
		
	}
	
};
module.exports=
{
run		

};