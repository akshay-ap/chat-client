/*jshint esversion: 6 */

//This module needs no dependency
var PAGE_ACCESS_TOKEN='EAAK2FVDaxugBAJgxPAZCDmMzxs58mVjgeXoPNZC94EiPmkIdmqZA0dokPpMdMAkWlmkH1LD82EHQZA1JG8nv9A1YhHQOtRPQoUjflmdOmfqKjYMZCsZBF9SYtM5GdMgkGbSfahAI61ZAjQQY02WmMVKHBlHZAZBb9QDKu7q85VqFInQZDZD';
var VERIFY_TOKEN='VERIFY_TOKEN';


//CHANGE THIS
const BOT_DATABASE='test';
const USER_TABLE='users';
const BOT_DATABASE_USER_NAME='root';
const BOT_DATABASE_PASS='root';
const DATABASE_URL='localhost';


//CHANGE THIS
const MONGO_URL='mongodb://localhost:27017/Logs';
const MONGO_USER='bot';
const MONGO_PASSWORD='bot';


//To insert logs in mongodb
const LOGGER=false;


const CHAT_SERVER='http://localhost:9000';

const RESET_SESSION=['hi','reset'];
//var USER_TABLE_2='users';



const SET_TIMER=true;
const TIMEOUT_INTERVAL=600000;//milliseconds


module.exports=
{
		
		MONGO_URL,
		MONGO_USER,
		MONGO_PASSWORD,
		LOGGER,
		CHAT_SERVER,
		PAGE_ACCESS_TOKEN,
		VERIFY_TOKEN,
		BOT_DATABASE_USER_NAME,
		USER_TABLE,
		BOT_DATABASE,
		DATABASE_URL,
		BOT_DATABASE_PASS,
		SET_TIMER,
		TIMEOUT_INTERVAL

};



//https://www.facebook.com/profile.php?id=100013868190569&ref=bookmarks
