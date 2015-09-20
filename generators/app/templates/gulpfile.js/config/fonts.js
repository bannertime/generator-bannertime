'use strict';

var config = require('./');

module.exports = {
  watch: config.sourceAssets + '/**/fonts/**/*',
  src: config.sourceAssets + '/**/fonts/**/*',
  dest: config.publicAssets
};
