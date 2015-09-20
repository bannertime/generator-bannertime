'use strict';

var chalk = require('chalk');

module.exports = function(Bannertime) {

  /**
   * Display a message when the generator has completed successfully.
   */
  Bannertime.prototype.end = function end() {
    this.log('\n');
    this.log(chalk.bold.yellow('------------------------------------'));
    this.log(chalk.bold.yellow('|  Start by entering \'') + chalk.bold.blue('gulp') + chalk.bold.yellow('\' below  |'));
    this.log(chalk.bold.yellow('------------------------------------'));
    this.log(' ');
    this.log(chalk.bold.red('For help: gulp help'));
  };

};
