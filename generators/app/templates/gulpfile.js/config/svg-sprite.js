'use strict';

var config = require('./');

module.exports = {
  src: config.sourceAssets + '/**/sprites/*.svg',
  dest: config.publicAssets
};
