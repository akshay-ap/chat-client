/*jshint esversion: 6 */

const TAG='NEW BOT ==== ';
const url = require('url');
const qs = require('querystring');
const EventEmitter = require('events').EventEmitter;
const request = require('request');
const crypto = require('crypto');
class Bot extends EventEmitter {
  constructor (opts) {
    super();
    this.token='SAMPLE_TOKEN';
  }

/*  getProfile (id, cb) {
    if (!cb) {cb = Function.prototype;}

    //My MEssages
    request({
        method: 'GET',
        uri:'http://127.0.0.1:9000/profile',
        //uri: `https://graph.facebook.com/v2.6/${id}`,
        qs: {
          fields: 'first_name,last_name',
          access_token: this.token

        },
        json: true
      }, (err, res, body) => {
        if (err) {return cb(err);}
        if (body.error) {return cb(body.error);}
      //  console.log(TAG,"get main",body);
        cb(null, body);
      });

  }*/

  sendMessage (recipient, payload, cb) {
    if (!cb) {cb = Function.prototype;}
    //My mess
    //console.log(TAG,"______________sending messge");
    /*request({
      method: 'POST',
      uri:'http://127.0.0.1:9000/message',
      qs: {
          access_token: this.token
        },
      json: {
        recipient: { id: recipient },
        message: payload
      }
    }, (err, res, body) => {
      if (err){ return cb(err);}
      if (body.error) {return cb(body.error);}
      console.log(TAG,"SEND MESSAGE FORMAT ",body);
      cb(null, body);
    });*/

    request({
    method: 'POST',
    uri:'http://127.0.0.1:9000/message',
    json: true,
    headers: {
        "content-type": "application/json",
    },
    body: JSON.stringify({
        recipient: { id: recipient },
        message: payload
      })

  }, (err, res, body) => {
    if (err){ return cb(err);}
    if (body.error) {return cb(body.error);}
   // console.log(TAG,"SEND MESSAGE FORMAT ",body);
    cb(null, body);
  });

  }

  sendSenderAction (recipient, senderAction, cb) {
    if (!cb) {cb = Function.prototype;}
    //my message
    request({
      method: 'POST',
      uri:'http://127.0.0.1:9000/profile',
      // uri: 'https://graph.facebook.com/v2.6/me/messages',
      qs: {
        access_token: this.token
      },
      json: {
        recipient: {
          id: recipient
        },
        sender_action: senderAction
      }
    }, (err, res, body) => {
    	if (err) {return cb(err);}
        if (body.error){ return cb(body.error);}

        cb(null, body);
    });

  }



  middleware () {
    return (req, res) => {
      // we always write 200, otherwise facebook will keep retrying the request
      res.writeHead(200, { 'Content-Type': 'application/json' });
      if (req.url === '/_status') {return res.end(JSON.stringify({status: 'ok'}));}
  //    if (this.verify_token && req.method === 'GET') {return this._verify(req, res);}
      if (req.method !== 'POST') {return res.end();}

      let body = '';

      req.on('data', (chunk) => {
        body += chunk;
      });
      req.on('end', () => {
        // check message integrity

    /*
        if (this.app_secret) {
          let hmac = crypto.createHmac('sha1', this.app_secret)
          hmac.update(body)

          if (req.headers['x-hub-signature'] !== `sha1=${hmac.digest('hex')}`) {
            this.emit('error', new Error('Message integrity check failed'))
            return res.end(JSON.stringify({status: 'not ok', error: 'Message integrity check failed'}))
          }
        }*/

        let parsed = JSON.parse(body);
        this._handleMessage(parsed);
      //  console.log(TAG,"PARSED====",JSON.stringify(parsed));
        res.end(JSON.stringify({status: 'ok'}));
      });
    };
  }

  _handleMessage (json) {
	  //console.log(TAG,"________json.entry",JSON.stringify(json));
    let entries = json.entry;
   // console.log(TAG,'')
    entries.forEach((entry) => {
      let events = entry.messaging;

      events.forEach((event) => {
        // handle inbound messages and echos
      //	console.log(TAG,"========================",JSON.stringify(json));

        if (event.message) {


          if (event.message.is_echo) {
            this._handleEvent('echo', event);
          } else {
          //	console.log(TAG,"MESSAGE EVENT");

            this._handleEvent('message', event);
          }
        }

        // handle postbacks
        if (event.postback) {
        	//console.log(TAG,"PBACK ECVENT");

          this._handleEvent('postback', event);
        }

        //handle breadcrum click
        if (event.breadcrum) {
        	//console.log(TAG,"BREAD CRUM ECVENT");
        	this._handleEvent('breadcrum', event);
          }

        // handle message delivered
        if (event.delivery) {
          this._handleEvent('delivery', event);
        }

        if (event.disconnect) {
          this._handleEvent('disconnect', event);
        }
        // handle message read
        if (event.read) {
          this._handleEvent('read', event);
        }

        // handle authentication
        if (event.optin) {
          this._handleEvent('authentication', event);
        }

        // handle account_linking
        if (event.account_linking && event.account_linking.status) {
          if (event.account_linking.status === 'linked') {
            this._handleEvent('accountLinked', event);
          } else if (event.account_linking.status === 'unlinked') {
            this._handleEvent('accountUnlinked', event);
          }
        }
      });
    });
  }


  _handleEvent (type, event) {
	    this.emit(type, event, this.sendMessage.bind(this, event.sender.id));

  }
}

module.exports = Bot;
