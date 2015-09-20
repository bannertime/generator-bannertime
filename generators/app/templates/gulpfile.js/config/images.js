'use strict';

var config = require('./');

module.exports = {
  src: config.sourceAssets + '/**/images/**/*',
  dest: config.publicAssets
};
