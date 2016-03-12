'use strict';

/**
 * The generator intro message.
 */

import chalk from 'chalk';

export default function() {
  let message =
  chalk.green('\n  _____           _   _') +
  chalk.green('\n |   | |___ _ _ _| |_|_|_____ ___') +
  chalk.green('\n | | | | -_| | | |  _| |     | -_|') +
  chalk.green('\n |_|___|___|_____|_| |_|_|_|_|___|\n');
  this.log(message);
}
