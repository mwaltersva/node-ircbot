'use strict';
const http = require('http');

function trump(client) {
  client.addListener('message', trumpQuote);

  function trumpQuote(nick, to, text) {
    if (text.match(/!trump.*/i)) {

      http.request({
        host: 'localhost',
        port: '3000',
        path: '/trump',
        method: 'GET'
      }, (response) => {
        console.log(JSON.stringify(response));
      })
    }
  }

  function getTarget(text) {
    return text.replace('!trump', '').trim();
  }
}