/**
 * The generator intro message.
 */

import chalk from 'chalk';

export default function () {
  const message =
  chalk.green('\n  _____             _   _') +
  chalk.green('\n |     |___ ___ _ _| |_|_|_____ ___') +
  chalk.green('\n |   --| . | . | | |  _| |     | -_|') +
  chalk.green('\n |_____|___|  _|_  |_| |_|_|_|_|___|') +
  chalk.green('\n           |_| |___|\n');
  this.log(message);
}
