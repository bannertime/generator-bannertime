/**
 * The questions that the sub-generator will ask.
 */

import s from 'underscore.string';

export default function () {
  if (this.skipConfig) return;
  const cb = this.async();

  this.prompt([{
    type: 'input',
    name: 'bannerWidth',
    message: 'Set the width of the banner:',
    default: '300',
  }, {
    type: 'input',
    name: 'bannerHeight',
    message: 'Set the height of the banner:',
    default: '250',
  }, {
    type: 'input',
    name: 'bannerName',
    message: 'What is the name of the new format? (kebab-case)',
    default: (answer) => `${this.appname}-${answer.bannerWidth}x${answer.bannerHeight}`,
    filter: (answer) => s.slugify(answer),
  }, {
    type: 'list',
    name: 'bannerType',
    message: 'What type of banner is it?',
    choices: ['DoubleClick', 'Sizmek', 'Adform', 'DCM', 'Atlas', 'Flashtalking', 'None'],
    default: 'DoubleClick',
  }, {
    type: 'confirm',
    name: 'includeOfflineScripts',
    message: 'Include vendor scripts for offline use?',
    default: false,
  }], (props) => {
    this.props = props;
    cb();
  });
}
