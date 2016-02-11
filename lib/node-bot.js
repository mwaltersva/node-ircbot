'use strict';

const irc = require('irc');

module.exports = {
  createClient: createClient
};

/**
 * Creates the client connection and returns the node-irc object
 * @param {object} config
 * @returns {*|{}|Array}
 */
function createClient(config) {
  const clients = config.map((el) => {
    return new irc.Client(el.server, el.nick, {
      channels: el.channels
    });
  });

  clients.forEach((client, index) => {
    const errorHandler = typeof config[index].errorHandler !== 'undefined' ?
        config[index].errorHandler : defaultErrorHandler;

    registerErrorHandler(client, errorHandler);
  });

  return clients;
}

/**
 * Default error handler
 * @param error
 */
function defaultErrorHandler(error) {
  console.log(error);
}

/**
 * Registers an error handler
 * @param {object} client - The node-irc object
 * @param {function} errorHandler - The error handler function!
 */
function registerErrorHandler(client, errorHandler) {
  client.addListener('error', errorHandler);
}
