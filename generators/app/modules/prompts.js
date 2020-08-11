/**
 * The questions that the generator will ask.
 */

const _ = require('lodash');
const { slugify } = require('underscore.string');

module.exports = function prompts() {
  if (this.skipConfig) return true;

  return this.prompt([{
    type: 'input',
    name: 'bannerName',
    message: 'What is the name of the banner? (kebab-case):',
    default: this.appname,
    filter: answer => slugify(answer)
  }, {
    type: 'input',
    name: 'bannerDesc',
    message: 'Describe the banner:',
    default: 'Its Duncan Bannertime!'
  }, {
    type: 'list',
    name: 'bannerType',
    message: 'What type of banner is it?',
    choices: ['Studio (formerly Doubleclick Studio)', 'Sizmek', 'Adform', 'Campaign Manager / CM', 'Atlas', 'Flashtalking', 'IAB', 'Google Ads / GDA / GDN', 'None'],
    default: 'Studio (formerly Doubleclick Studio)'
  }, {
    type: 'input',
    name: 'bannerRepo',
    message: 'What is the link to the repository?',
    default: 'https://github.com/bannertime/generator-bannertime'
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
