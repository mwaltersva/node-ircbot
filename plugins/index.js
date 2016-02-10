'use strict';
const fs = require('fs');

module.exports = fs.readdirSync(__dirname + '/').filter((file) => {
  return file.match(/\.js$/i) !== null && file !== 'index.js'
}).map((file) => {
  return require('./' + file);
});