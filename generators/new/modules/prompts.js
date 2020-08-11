/**
 * The questions that the sub-generator will ask.
 */

const _ = require('lodash');
const { slugify } = require('underscore.string');

module.exports = function prompts() {
  if (this.skipConfig) return true;

  return this.prompt([{
    type: 'input',
    name: 'bannerWidth',
    message: 'Set the width of the banner:',
    default: '300'
  }, {
    type: 'input',
    name: 'bannerHeight',
    message: 'Set the height of the banner:',
    default: '250'
  }, {
    type: 'input',
    name: 'bannerName',
    message: 'What is the name of the new format? (kebab-case)',
    default: answer => `${this.appname}-${answer.bannerWidth}x${answer.bannerHeight}`,
    filter: answer => slugify(answer)
  }, {
    type: 'list',
    name: 'bannerType',
    message: 'What type of banner is it?',
    choices: ['Studio (formerly Doubleclick Studio)', 'Sizmek', 'Adform', 'Campaign Manager / CM', 'Atlas', 'Flashtalking', 'IAB', 'Google Ads / GDA / GDN', 'None'],
    default: 'Studio (formerly Doubleclick Studio)'
  }, {
    when: response => response.bannerType === 'Studio (formerly Doubleclick Studio)',
    type: 'confirm',
    name: 'includeOfflineScripts',
    message: 'Include vendor scripts for offline use?',
    default: false
  }]).then((props) => {
    this.props = _.merge(this.props, props);
  });
};
