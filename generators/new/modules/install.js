'use strict';

var chalk = require('chalk');

module.exports = function(Bannertime) {

  /**
   * Install gsap locally.
   */
  Bannertime.prototype.install = function() {
    if (this.props.includeGsap === true) {
      this.npmInstall(['gsap'], {
        'saveDev': true
      });
    };

    this.log(chalk.green('New banner format generated'));
  };

};
