'use strict';

/**
 * Install the dependencies.
 */

import chalk from 'chalk';

export default function() {
  this.log(chalk.green('File structure set up, now running npm install'));
  this.log(chalk.green('This may take a few minutes...'));
  this.log(chalk.red('Please be patient!'));

  if (!this.options['skip-install']) {
    this.npmInstall();
  }

  if (this.props.includeOfflineScripts === true) {
    this.npmInstall(['gsap'], {
      skipInstall: this.options['skip-install'],
      'saveDev': true
    });
  };
}

