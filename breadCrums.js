/*jshint esversion: 6 */
const TAG='Bread CRUM === ';
//Needs only Config.js
const request = require('request');
const Config=require('./config');

/*
 * This module is responsible for handling the bread crums There are three
 * levels of breadcrums : level 1 ,2 and 3. Each breadcrum is associated with a
 * handler and parameters for that handler.
 * 
 * 
 * USAGE : update_breadCrum(sessionId,level,msg,function,params);
 * 
 * Parameters: sessionId : Unique id of user from whom breadcrum event was
 * recieved. level : Level of breadcrum valid inputs : 1,2 or 3. LEvels can be
 * increased as needed. Relevent change should be made in HTML file of Chat
 * Server. msg : Text to be displayed to user. function : Handler when the user
 * click the breadcrum params : an array. Parameters to be given to the function
 * to execute.
 */


// template for sending the breadcrum request
var data=
{			"level":null,
			"timestamp":"1491914964249",
			"recipientid":null,
			"message":""	
};


function send(data)
{
	

	
	//console.log(TAG,' DATA to bread crum ', data);
	request({
    method: 'POST',
    uri:Config.CHAT_SERVER+'/breadcurm',
    json: true,
    headers: {
        "content-type": "application/json",
    },
    body: JSON.stringify({
        message: data
      })
	}, (err, res, body) => {
    if (err){ 
    	console.log(TAG,"Error in sending breadcrum");
    }
  	});
}

// This function will be called whenever user Clicks any breadcrum
// It will resolve the level and context and trigger action accordingly
var handle=function(click_level,sessionId)
{

	/*
	 * global.session[sessionId].breadCrum[click_level].handler contains
	 * the reference to the function
	 * 
	 * global.session[sessionId].breadCrum[click_level].params contains
	 * the parameters of the function to b called
	 */
	//console.log(TAG,"____HANDLEING BREADCRUM");
	var params=global.session[sessionId].breadCrum[click_level].params;
	var function_to_call=global.session[sessionId].breadCrum[click_level].handler;
	if(typeof params==='undefined' ||typeof function_to_call ==='undefined')
	{ 
		/*
		 * Check if handler and parameters for the breadcrum have been defined.
		 * Not doing so will lead to error and chat bot will terminate.
		 */
		
		console.error();}
	else
		{
		/*
		 * Everything OK. Handler and parameters are present. So run the handler
		 * function.
		 */
		function_to_call.call(this,params);
		}
}; 




var update_breadCrum=function (...arg)
{
	let sessionId=arg[0];
	let level=arg[1];
	let msg=arg[2];
	let handler=arg[3];
	let params=arg[4];

	//console.log(TAG,"------",arg);
		if(typeof global.session[sessionId].breadCrum==='undefined')
		{
			 global.session[sessionId].breadCrum={}
		}
		// console.log(TAG,"handler__",typeof handler);
		global.session[sessionId].breadCrum[level]={};
		global.session[sessionId].breadCrum[level].handler=handler;
		global.session[sessionId].breadCrum[level].params=params;
		//console.log(TAG,"handler__",global.session[sessionId].breadCrum[level]);
		//console.log(global.session[sessionId].breadCrum);
		data.level=level;
		data.message=msg;
		data.timestamp=Date.now();
		data.recipientid=global.session[sessionId].fbid;
		
		global.session[sessionId].logs[Date.now()]={type:1,input:"breadcrum",data:data};

		
		send(data);
};

var dummy=function(...arg)
{
};
var clear=function(sessionId)
{
	//console.log(TAG,"__________clear fei iodg jdk");
	update_breadCrum(sessionId,1,".",dummy,"");
	update_breadCrum(sessionId,2,".",dummy,"");
	update_breadCrum(sessionId,3,".",dummy,"");

};

module.exports={	
 handle,
 update_breadCrum,
 clear
};

