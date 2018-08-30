/*jshint esversion: 6 */
//Needs no dependency
/*Use these variables to control interaction with user
 *
 * e.g. Registration process : Take name, number, email.
 * 
 * 
 * 
 * */

const CONTEXT_SESSION_SUPPLIER='supplierSession';
const CONTEXT_SESSION_MEETING='meetingSession';
const CONTEXT_SESSION_BUYER='buyerSession';
const CONTEXT_SESSION_DISTRIBUTER='distributerSession';
const CONTEXT_SESSION_HELP='helpSession';
const CONTEXT_SESSION_FREE_BIZ_TOOL='freebizsession';
const CONTEXT_SESSION_ENTERPRISE='enterprisesession';
const CONTEXT_SESSION_INDIVIDUAL='individualsession';
const CONTEXT_SESSION_REGISTRATION='registrationSession';
const CONTEXT_SESSION_DEFAULT='defaultSession';
const CONTEXT_SESSION_GREET='greetingSession';
const CONTEXT_UNDEFINED='undefined';

const CONTEXT_TEMPLATE_MESSAGE='template_message_module';

/*Use these variables to send reply to user
 *Types of replies :  text, buttons, card-view
 * 
 * */
var CONTEXT_REPLY_MESSAGE='message';
var CONTEXT_REPLY_ATTACHMENT='attachment';
var CONTEXT_REPLY_BUTTON='buttons';

module.exports=
{		
		CONTEXT_TEMPLATE_MESSAGE,
		CONTEXT_SESSION_ENTERPRISE,
		CONTEXT_SESSION_INDIVIDUAL,
		CONTEXT_SESSION_FREE_BIZ_TOOL,
		CONTEXT_SESSION_SUPPLIER,
		CONTEXT_SESSION_REGISTRATION,
		CONTEXT_SESSION_GREET,
		CONTEXT_SESSION_HELP,
		CONTEXT_SESSION_BUYER,
		CONTEXT_SESSION_DEFAULT,
		CONTEXT_SESSION_DISTRIBUTER,
		CONTEXT_UNDEFINED,
		CONTEXT_REPLY_MESSAGE,
		CONTEXT_REPLY_ATTACHMENT,
		CONTEXT_REPLY_BUTTON,
		
		
};