/**
 * Install the dependencies.
 */

const chalk = require('chalk');

module.exports = function install() {
  this.log(chalk.green('New banner format generated'));

  if (this.props.includeOfflineScripts === true) {
    this.npmInstall(['gsap'], {
      dev: true
    });
  }
};
