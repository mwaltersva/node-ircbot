'use strict';

class Responder {
  constructor(client) {
    this.client = client;
    this.responders = [];

    this._createListener();
  }

  /**
   * Creates the default message listener, and passes the message to the response manager
   * @private
   */
  _createListener() {
    this.client.addListener('message', (nick, to, text, message) => {
      this._responseManager(this.client, nick, to, text, message);
    });
  }

  /**
   * Accepts messages from the message listener and runs matching plugins
   * @param {object} client - The node-irc object for the connection
   * @param {string} nick - The nick of the client who sent the message
   * @param {string} to - Who/What the message was to (Channel or nick)
   * @param {string} text - The "body" of the message, excluding nick/channel
   * @param {string} message - The full content of the message
   * @returns {boolean}
   * @private
   */
  _responseManager(client, nick, to, text, message) {
    //See if the message is to the bot, if it's not, ignore it.
    if (!this._isToMe(client, to) && !this._isToMe(client, text)) {
      return false;
    }

    //Find matching responders!
    const matchingResponders = this.responders.filter((responder) => {
      return text.search(new RegExp(responder.regexp, 'ig')) > -1;
    });

    //Do all the responder things
    matchingResponders.forEach((responder) => {
      if (typeof responder.action !== 'undefined') {
        responder.action(client, nick, to, text, message);
      }
    });
  }

  /**
   * Checks if the testStr contains the current client's nick, returns true or false
   * @param {object} client - The node-irc object for the connection
   * @param {string} testStr - The string to be tested
   * @returns {boolean}
   * @private
   */
  _isToMe(client, testStr) {
    return testStr.search(new RegExp(client.opt.nick, 'ig')) > -1;
  }

  /**
   * Registers plugins
   * @param {object} responder
   * @param {string} responder.regexp - What should the bot respond to?
   * @param {function} responder.action - What should the bot do?
   */
  registerResponder(responder) {
    responder = responder || {};

    if (typeof responder.regexp === 'undefined' || typeof responder.action === 'undefined') {
      throw new Error('The responder must have a regexp and action property');
    }

    this.responders.push(responder);
  }
}

module.exports = Responder;
