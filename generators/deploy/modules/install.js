'use strict';

/**
 * Install the dependencies.
 */

import chalk from 'chalk';

export default function() {
  this.log(chalk.green('Added deploy task, now installing required dependencies'));
  this.npmInstall(['gulp-shell'], { 'saveDev': true });
}
