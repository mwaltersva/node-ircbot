'use strict';
const nodeBot = require('./lib/node-bot');

const config = nodeBot.loadConfig();
nodeBot.createClient(config);
