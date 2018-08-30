/*jshint esversion: 6 */
//Needs no dependency
//Messages in greet sessions

const FIRST_MESSAGE_TO_USER='Hello There !! Welcome to the sample Helpline. Our chat assistant (bot) will help you guide to the next steps.';
const GREET_BUTTONS_B_S='Are you a buyer or supplier? ';
const GREET_BUTTONS_D_T_M='Choose the following options if you are a trader or to set meeting with us.';
const GREET_BUTTONS_HELP='For help and information about us, Click the button below ';


const TIMEOUT_MESSAGES=['Hello!! You there?','Are you there?','Are you too busy to ignore me??','Tuk Tuk...I am still here.'];
const TEMPLATE_MESSAGE='template_message_ref';

//INDIVIDUAL SESSION
const INDIVIDUAL_SET_MEETING="<a href=mailto:sales@sample.com?subject=Individual%20Mail%20regarding%20Setting%20Meeting>Click here to send us an email for setting the meeting</a>";
const INDIVIDUAL_PARTNER_WITH_US="<a href=mailto:sales@sample.com?subject=Individual%20Mail%20regarding%20partner%20with%20sample>Click here to send us an email for further process</a>";
//Main Menu data
const GREET_CARDVIEW_MAIN_MENU='Menu';
const GREET_CARDVIEW_BUTTON_TITLE='View more';


	let Title='Sample title';
	let image_url='http://19966-presscdn-0-84.pagely.netdna-cdn.com/wp-content/uploads/2016/12/the-best-2016.png';
	let item_url="http://sample.com/";
	let type='postback';
	let payload='yo yo';
	let temp=[Title,image_url,item_url,type,payload];
	var data=[temp,temp,temp];

//Used when user is shown the menu
const GREET_BUTTONS_MAIN_MENU='Are you an...';
const GREET_TITLE_MENU='To help us to assist you better, please select from the below options';
//Messages in registration session
const REGISTRAITON_REQUEST='To help you with personalised recommendations,';
const REGISTRATION_GREET='We are very pleased that you have joined Expostore.<br>Welcome to the sample Business Network';


const ENTERPRISE_WELCOME='sample provides supply & procurement solutions for Enterprises';
const ENTERPRISE_AUTOMATED_EMAIL="<a href=mailto:sales@sample.com?subject=Supply%20and%20Procurement%20solutions>Click here to send us an email for further process</a>";
const ENTERPRISE_BOOK_DEMO="<a href=mailto:sales@sample.com?subject=Enterprie%20book%20demo>Click here to send us an email for further process</a>";
//Messages in HELP:
const HELP_FAQ='1.Supplier Registration Process<br>'+
	'2.Corporate Program<br>'+
	'3.Network Hub<br>'+
	'4.Growth Mettings<br>'+
	'5.sample Group Services';

const HELP_OPTIONS='Please choose an option : <br><a href=mailto:sales@sample.com?Subject=From%20Website>1.Email-us</a><br>2.Contact us:<br>'+'<a href=tel:91 8030178198>+91 8030178198</a>';
//const HELP_OPTIONS='Please choose an option : <br><a href=mailto:sales@sample.com?Subject=From%20Website>1.Email-us</a><br>2.Contact us:<br>'+'<a href="tel:91 8030178198">+91 8030178198</a>';


const HELP_ABOUT='<a href=http://www.sample.com target=_blank>Click here to visit about us section.</a>';
const HELP_CONTACT='Here are our contact details : <br> '+
					'Contact number : +919987660501'+ '<br>'+
					'Email-id : help@sample.com';


//Other messages
const UNDEFINED_MESSAGE_FROM_USER='Please choose correct option';
const UNDEFINED_POSTBACK_FROM_USER="Please Choose correct one of the above options or enter 'menu' to go to Main Menu";


const GENERAL_OPTION='Please choose an option from the following';
//CARDVIEWS:
//LINK TO APP
var applink=function()
{
	//Show link to app.
	let C_1_1_P=["https://play.google.com/store/apps/details?id=app.sample&utm_source=mobile&utm_campaign=MobileAppInvites&utm_medium=sms&utm_term=app%20downloads%2C%20stocklots%2C%20wholesale&utm_content=mobileinvites"];
	let C_1_1_T=['We have an app dedicated for finding products that you need. Click the button below to install the app.'];
	let C_1_1_D=['web_url'];
	let C_1_1_I=["https://pbs.twimg.com/profile_images/792256636190494720/8Yy2wo82.jpg"];
	let C_1_1_U=["https://pbs.twimg.com/profile_images/792256636190494720/8Yy2wo82.jpg"];
	//Build the data for the menu
	//card view to show link to app.
		let temp=[];
		temp.push(C_1_1_T[0]);
		temp.push(C_1_1_U[0]);
		temp.push(C_1_1_I[0]);
		temp.push(C_1_1_D[0]);
		temp.push(C_1_1_P[0]);
		//global.sendreply(this.fbid,{text:"free option 2 "});
		return [temp];

};
//END LINK TO APP

var supplierAppLink=function()
{
	//Show link to app.
	let C_1_1_P=["https://play.google.com/store/apps/details?id=app.sample&utm_source=mobile&utm_campaign=MobileAppInvites&utm_medium=sms&utm_term=app%20downloads%2C%20stocklots%2C%20wholesale&utm_content=mobileinvites"];
	let C_1_1_T=['We have an app dedicated exclusively for suppliers to advertise their products. If you are a supplier and wish to advertise your products click the button below.'];
	let C_1_1_D=['web_url'];
	let C_1_1_I=["https://pbs.twimg.com/profile_images/792256636190494720/8Yy2wo82.jpg"];
	let C_1_1_U=["https://pbs.twimg.com/profile_images/792256636190494720/8Yy2wo82.jpg"];
	//Build the data for the menu
	//card view to show link to app.
		let temp=[];
		temp.push(C_1_1_T[0]);
		temp.push(C_1_1_U[0]);
		temp.push(C_1_1_I[0]);
		temp.push(C_1_1_D[0]);
		temp.push(C_1_1_P[0]);
		//global.sendreply(this.fbid,{text:"free option 2 "});
		return [temp];

}




module.exports={
		//Other Messages
		UNDEFINED_MESSAGE_FROM_USER,


		FIRST_MESSAGE_TO_USER,
		GREET_BUTTONS_B_S,
		GREET_BUTTONS_D_T_M,
		GREET_BUTTONS_HELP,
		GREET_BUTTONS_MAIN_MENU,
		//
		REGISTRAITON_REQUEST,
		REGISTRATION_GREET,

		GENERAL_OPTION,
		ENTERPRISE_WELCOME,
		ENTERPRISE_AUTOMATED_EMAIL,
		ENTERPRISE_BOOK_DEMO,
		
		INDIVIDUAL_PARTNER_WITH_US,
		INDIVIDUAL_SET_MEETING,
		
		
		TIMEOUT_MESSAGES,
		//Export Help secttion
		HELP_FAQ,
		HELP_OPTIONS,
		HELP_ABOUT,
		HELP_CONTACT,
		
		TEMPLATE_MESSAGE,
		//Cardviews
		applink,
		supplierAppLink
};
