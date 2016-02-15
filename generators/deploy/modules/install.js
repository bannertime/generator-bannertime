'use strict';

var chalk = require('chalk');

module.exports = function(Bannertime) {

  /**
   * Install dependencies.
   */
  Bannertime.prototype.install = function() {
    this.log(chalk.green('Added deploy task, now running npm install'));
    this.log(chalk.red('Please be patient!'));
    this.npmInstall(['gift', 'wrap-promise', 'rimraf', 'readable-stream', 'vinyl-fs'], { 'saveDev': true });
  };

};
