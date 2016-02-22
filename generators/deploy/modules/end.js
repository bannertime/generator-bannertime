'use strict';

var chalk = require('chalk');

module.exports = function(Bannertime) {

  /**
   * Display a message when the sub-generator has completed.
   */
  Bannertime.prototype.end = function() {
    this.log(chalk.bold.green('Deploy task set up successfully...'));
    this.log(chalk.red('Run ') + chalk.green('gulp deploy') + chalk.red(' to deploy the public folder.'));
    this.log('');
  };

};
