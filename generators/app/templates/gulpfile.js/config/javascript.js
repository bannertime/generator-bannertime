'use strict';

var config = require('./');

module.exports = {
  src: config.sourceDirectory + '/**/js/**/*.js',
  dest: config.publicAssets
};
