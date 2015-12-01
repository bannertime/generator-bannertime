'use strict';

var config = require('./');

module.exports = {
  src: config.publicDirectory + '/**/*',
  dest: './zip'
};
