'use strict';
const irc = require('irc');
const plugins = require('../plugins');

module.exports = {
  loadConfig: loadConfig,
  createClient: createClient
};

function loadConfig() {
  return require('../config');
}

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
    if (plugins instanceof Array) {
      plugins.forEach((plugin) => {
        registerPlugin(client, plugin);
      });
    }
  });

  return clients;
}

function defaultErrorHandler(error) {
  console.log(error);
}

function registerErrorHandler(client, errorHandler) {
  client.addListener('error', errorHandler);
}

function registerPlugin(client, plugin) {
  plugin(client);
}
