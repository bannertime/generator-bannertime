/**
 * The sub-generator intro message.
 */

const chalk = require('chalk');

module.exports = function intro() {
  const message =
  chalk.green('\n  ____          _         _   _') +
  chalk.green('\n |    \\ ___ ___| |___ _ _| |_|_|_____ ___') +
  chalk.green('\n |  |  | -_| . | | . | | |  _| |     | -_|') +
  chalk.green('\n |____/|___|  _|_|___|_  |_| |_|_|_|_|___|') +
  chalk.green('\n           |_|       |___|\n');
  this.log(message);
};
