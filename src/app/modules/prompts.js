'use strict';

/**
 * The questions that the generator will ask.
 */

import path from 'path';
import s from 'underscore.string';

export default function() {
  if (this.skipConfig) return;
  let cb = this.async();

  this.prompt([{
    type: 'input',
    name: 'bannerName',
    message: 'What is the name of the banner? (kebab-case):',
    default: this.appname,
    filter: (answer) => {
      return s.slugify(answer)
    }
  }, {
    type: 'input',
    name: 'bannerDesc',
    message: 'Describe the banner:',
    default: 'Its Duncan Bannertime!'
  }, {
    type: 'list',
    name: 'bannerType',
    message: 'What type of banner is it?',
    choices: ['DoubleClick Studio', 'Sizmek', 'Adform', 'DCM', 'Atlas', 'Flashtalking', 'IAB'],
    default: 'DoubleClick Studio'
  }, {
    type: 'input',
    name: 'bannerRepo',
    message: 'What is the link to the repository?',
    default: 'http://github.com/pyramidium/generator-bannertime'
  }, {
    type: 'confirm',
    name: 'includeOfflineScripts',
    message: 'Include vendor scripts for offline use?',
    default: false
  }], (props) => {
    this.props = props;
    cb();
  });
}
