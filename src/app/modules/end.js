/**
 * The generator end message.
 */

import chalk from 'chalk';

export default function () {
  const yellow = chalk.bold.yellow;
  const green = chalk.bold.green;
  const red = chalk.bold.red;
  this.log('\n');
  this.log(yellow('------------------------------------'));
  this.log(yellow('|  Start by entering \'') + green('gulp') + yellow('\' below  |'));
  this.log(yellow('------------------------------------'));
  this.log(' ');
  this.log(red('For help: gulp help'));
}
