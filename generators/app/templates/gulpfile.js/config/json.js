'use strict';

var config = require('./');

module.exports = {
  src: config.sourceDirectory + '/**/*.json',
  dest: config.publicDirectory
};
