/**
 * Install the dependencies.
 */

const chalk = require('chalk');

module.exports = function() {
  this.log(chalk.green('New banner format generated'));

  if (this.props.includeOfflineScripts === true) {
    this.yarnInstall(['gsap'], {
      dev: true
    });
  }
};
