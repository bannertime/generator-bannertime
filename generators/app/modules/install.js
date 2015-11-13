'use strict';

var chalk = require('chalk');

module.exports = function(Bannertime) {

  /**
   * Install dependencies from the package.json file.
   */
  Bannertime.prototype.install = function() {
    if (this.props.includeGsap === true) {
      this.npmInstall(['gsap'], {
        'saveDev': true
      });
    };

    this.log(chalk.green('File structure set up, now running npm install'));
    this.log(chalk.green('This may take a few minutes...'));
    this.log(chalk.red('Please be patient!'));
    this.npmInstall();
  };

};
