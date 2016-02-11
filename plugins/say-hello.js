'use strict';
module.exports = {
  regexp: 'hello',
  action: (client, nick, to, text, message) => {
    client.say(to, `Hello! ${nick}!`);
  }
};