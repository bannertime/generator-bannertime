'use strict';

/**
 * Install the dependencies.
 */

import chalk from 'chalk';

export default function() {
  this.log(chalk.green('New banner format generated'));

  if (this.props.includeOfflineScripts === true) {
    this.npmInstall(['gsap'], {
      'saveDev': true
    });
  };
}

