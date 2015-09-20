'use strict';

var config = require('./');

module.exports = {
  watch: config.sourceDirectory + '/**/*.html',
  src: [config.sourceDirectory + '/**/*.html'],
  dest: config.publicDirectory,
  htmlmin: {
    collapseWhitespace: true
  }
};
