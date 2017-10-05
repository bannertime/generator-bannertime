/**
 * The generator end message.
 */

const chalk = require('chalk');

module.exports = function end() {
  const { yellow, green, red } = chalk.bold;
  this.log('\n');
  this.log(yellow('┌---------------------------------------┐'));
  this.log(`${yellow('|  Start by entering \'')}${green('npm start')}${yellow('\' below  |')}`);
  this.log(yellow('└---------------------------------------┘'));
  this.log(' ');
  this.log(`${yellow('You can install gulp using:')} ${green('npm i -g gulp')}\n`);
  this.log(`${red('For help:')} ${green('gulp help')}\n`);
};
