'use strict';
module.exports = sayHello;

function sayHello(client) {
  client.addListener('message', hearHello);

  function hearHello(nick, to, text) {
    if (text.match(/hello/i)) {
      client.say(to, `Hello, ${nick}!`);
    }
  }
}