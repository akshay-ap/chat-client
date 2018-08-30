/*jshint esversion: 6 */
//Needs no dependency
const TAG="Manipulate output === ";
/*Use this function to send a list to user
 *Inputs: 
 *buttons_title :	
 *					type string array [] 
 *				 	each element contains title of the button to show to user
 *buttons_postback:
 *					type string array []
 *					each element contains a postback for each button
 * 
 *Constraints: 
 *length(buttons_arr)= length(buttons_postback)
 * 
 *Output:
 *
 * elementsFinal Json Object containing the Buttons
 * */
function getListViewOutput(title,list_title,buttons_title,buttons_postback,global_button_title,global_button_postback,callback)
{
var buttonsFinal=[];

	for (var i=0;i<list_title.length;i++)
		{
		buttonsFinal.push({
	            title: buttons_title[i],
	            payload: buttons_postback[i],
				buttons:
				{
					title:buttons_title[i],
					type:'web_url',
					payload: global_button_postback  	
				}
					
	});
		
		buttonsFinal.push({buttons:
			[{
				  title: global_button_title,
                  type: "postback",
                  payload: global_button_postback    
			}]
		});
		
	}//[End For]
console.log(buttonsFinal);
var messageData =  {
		type: "template",
        payload: {
          template_type: "list",
          text:title,
          elements: buttonsFinal
        }
  	};
callback(messageData);



}


module.exports = 
{

//Convert a single Json objectOutput in a string
// [Start getFormatedSingleObject]
getFormatedSingleObject:function(input,callback)
{

// console.log('From getFormatedSingleObject : ');
// console.log(JSON.stringify(input));
// console.log('in getFormattedSingle object');
var tempOutput=JSON.stringify(input);
tempOutput=tempOutput.replace(/"/g, "");
tempOutput=tempOutput.replace(/,/g, "\n");
tempOutput=tempOutput.replace(/{/g, "");
tempOutput=tempOutput.replace(/}/g, "");
tempOutput=tempOutput.replace('[', "");
tempOutput=tempOutput.replace(']', "");
if(tempOutput==='')
{
//console.log(tempOutput);
callback('Sorry,No such Record found');
}
else
{//console.log(tempOutput);
callback(tempOutput);}

},
// [END getFormatedSingleObject]


getFormatedArray:function(input,columnNames,callback)
{


var column_num=columnNames.length;
console.log(columnNames);
console.log('in getFormattedArray');
console.log(input);
var outputData=[];


for(var i in input)
{//[Start var i in input]
      var temp=[];
      for(var j in columnNames)
	{	
		temp.push(input[i][columnNames[j]]);
	}
	outputData.push(temp);
	temp=null;
	delete temp;
}//for i in input




if(outputData.length===0)
	{
	//console.log(outputData);
	callback('Sorry,No such Record found');
	}
else
	{
	console.log('FROM OUTPUT');
	//console.log(outputData);
	callback(outputData);
	}

},

// [END getFormatedSingleObject]


getCardViewOutput:function(maintitle,column1,callback)
{
//console.log('===========In getCardViewOutput============');
//console.log(column1);
var elementsFinal=[];

for (var i in column1)
{//[Start for]
elementsFinal.push({
		title:column1[i][0],
		image_url: column1[i][1].replace(/ /g, '%20'),
		item_url: column1[i][2],
		type: column1[i][3],
        payload: column1[i][4]
 /*	buttons: [

{
              type: "web_url",
              url: "https://sample	.com/",
              title: "Open Web URL"
            },
 {
              type: "postback",
              title: "See Subcategories",
              payload: column1[i][0],
            }]*/
});

//console.log(elementsFinal);
}//[End for]

//item_url:'http://www.google.com';
//image_url:'http://www.okclipart.com/free-images-to-use30byaubavr/';
var messageData =  {
        type: "template",
        payload: {
        	
        	title:maintitle,
            template_type: "generic",
            elements: elementsFinal
        }
  };

callback(messageData);
}//getCardViewOutput
,

/*Use this function to send a button to user
 *Inputs: 
 *buttons_arr :	
 *					type string array [] 
 *				 	each element contains title of the button to show to user
 *buttons_postback:
 *					type string array []
 *					each element contains a postback for each button
 * 
 *buttons_type :	type string array []
 *					optional parameter
 *					define web_url or postback button type
 *Constraints: 
 * 	length(buttons_arr)= length(buttons_postback)= length (buttons_type)
 * 
 *Output: 
 *
 * elementsFinal Json Object containing the Buttons
 * */
getButtonOutput:function(title,buttons_arr,buttons_postback,buttons_type,callback)
{
	var buttonsFinal=[];
	var buttons_function;
	//This is needed to set default value = 'postback' if user no button_type is provided
	if (typeof buttons_type === 'function') {
	    callback = buttons_type;
	   // buttons_type = new Array(buttons_arr.length);
	    buttons_type = Array.apply(null,{length: buttons_arr.length}).map(function() { return "postback"; });
	    //console.log(TAG,"Buttons funtion", buttons_type);
	  }
	  //continue
	

	buttons_function=buttons_type;
	
//console.log(TAG,"Buttons funtion", buttons_function);
for (var i=0;i<buttons_arr.length;i++)
	{
	
	
	
	buttonsFinal.push({
				type: buttons_function[i],
	            title: buttons_arr[i]
	            //payload:buttons_postback[i]
	});
	
	if(buttons_function[i]==='web_url')
	{
		buttonsFinal[i].url= buttons_postback[i];
	}
	else if (buttons_function[i]==='postback')
	{
		buttonsFinal[i].payload= buttons_postback[i];
	}
	}//[End For]
//console.log(TAG,'After button formation\n',buttonsFinal);
var messageData =  {
		type: "template",
        payload: {
          template_type: "button",
          text:title,
          buttons: buttonsFinal
        }
  	};
callback(messageData);
},


getListViewOutput:getListViewOutput


};//END EXPORTS

