'use strict';

var chalk = require('chalk');

module.exports = function(Bannertime) {

  /**
   * The sub-generator intro message.
   */
  Bannertime.prototype.intro = function() {
    var message =
    chalk.green('\n  _____           _   _') +
    chalk.green('\n |   | |___ _ _ _| |_|_|_____ ___') +
    chalk.green('\n | | | | -_| | | |  _| |     | -_|') +
    chalk.green('\n |_|___|___|_____|_| |_|_|_|_|___|\n');
    console.log(message);
  };

};
