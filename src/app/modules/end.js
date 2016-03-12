'use strict';

/**
 * The generator end message.
 */

import chalk from 'chalk';

export default function() {
  this.log('\n');
  this.log(chalk.bold.yellow('------------------------------------'));
  this.log(chalk.bold.yellow('|  Start by entering \'') + chalk.bold.green('gulp') + chalk.bold.yellow('\' below  |'));
  this.log(chalk.bold.yellow('------------------------------------'));
  this.log(' ');
  this.log(chalk.bold.red('For help: gulp help'));
}
