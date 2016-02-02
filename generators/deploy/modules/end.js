'use strict';

var chalk = require('chalk');

module.exports = function(Bannertime) {

  /**
   * Display a message when the sub-generator has completed.
   */
  Bannertime.prototype.end = function() {
    this.log(chalk.bold.green('Deploy task set up successfully...'));
    this.log(chalk.red('Please visit http://pyramidium.github.io/generator-bannertime/deploy.html for more information'));
    this.log('');
  };

};
