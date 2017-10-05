/**
 * Install the dependencies.
 */

const chalk = require('chalk');

module.exports = function install() {
  this.log(`${chalk.green('New banner format copied from:')} ${chalk.cyan(this.props.bannerMaster)}`);

  if (this.props.includeOfflineScripts === true) {
    this.npmInstall(['gsap'], {
      dev: true
    });
  }
};
