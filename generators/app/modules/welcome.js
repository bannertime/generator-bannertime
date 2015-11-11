'use strict';

var chalk = require('chalk');

module.exports = function(Bannertime) {

  /**
   * The generator welcome message.
   */
  Bannertime.prototype.welcome = function() {
    var message =
    chalk.yellow('\n Its Duncan') +
    chalk.green('\n  _____                     _   _') +
    chalk.green('\n | __  |___ ___ ___ ___ ___| |_|_|_____ ___') +
    chalk.green('\n | __ -| . |   |   | -_|  _|  _| |     | -_|') +
    chalk.green('\n |_____|__,|_|_|_|_|___|_| |_| |_|_|_|_|___|\n');
    console.log(message);
  };

};
