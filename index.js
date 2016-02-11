'use strict';
const nodeBot = require('./lib/node-bot');
const Responder = require('./lib/responder');
const plugins = require('./plugins');
const config = require('./config');

const clients = nodeBot.createClient(config);
const responders = clients.map((client) => {
  return new Responder(client);
});

responders.forEach((responder) => {
  if (plugins instanceof Array) {
    plugins.forEach((plugin) => {
      responder.registerResponder(plugin);
    });
  }
});
