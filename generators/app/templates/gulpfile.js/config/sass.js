'use strict';

var config = require('./');

module.exports = {
  autoprefixer: { browsers: ['last 2 version', 'safari 5', 'ie 8', 'ie 9', 'opera 12.1', 'ios 6', 'android 4'] },
  src: config.sourceAssets + '/**/*.{sass,scss}',
  dest: config.publicAssets
};
