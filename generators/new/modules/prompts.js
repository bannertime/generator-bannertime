/**
 * The questions that the sub-generator will ask.
 */

const _ = require('lodash');
const slugify = require('underscore.string').slugify;

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
    choices: ['DoubleClick Studio', 'Sizmek', 'Adform', 'DCM', 'Atlas', 'Flashtalking', 'IAB'],
    default: 'DoubleClick Studio'
  }, {
    when: response => response.bannerType === 'DoubleClick Studio',
    type: 'confirm',
    name: 'includeOfflineScripts',
    message: 'Include vendor scripts for offline use?',
    default: false
  }]).then((props) => {
    this.props = _.merge(this.props, props);
  });
};
