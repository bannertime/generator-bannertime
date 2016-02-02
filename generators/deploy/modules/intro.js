'use strict';

var chalk = require('chalk');

module.exports = function(Bannertime) {

  /**
   * The sub-generator intro message.
   */
  Bannertime.prototype.intro = function() {
    var message =
    chalk.green('\n  ____          _         _   _') +
    chalk.green('\n |    \\ ___ ___| |___ _ _| |_|_|_____ ___') +
    chalk.green('\n |  |  | -_| . | | . | | |  _| |     | -_|') +
    chalk.green('\n |____/|___|  _|_|___|_  |_| |_|_|_|_|___|') +
    chalk.green('\n           |_|       |___|\n');
    console.log(message);
  };

};
