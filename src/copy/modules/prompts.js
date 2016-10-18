'use strict';

/**
 * The questions that the sub-generator will ask.
 */

import fs from 'fs';
import path from 'path';
import s from 'underscore.string';

export default function() {
  if (this.skipConfig) return;
  let cb = this.async();

  let getFolders = (dir) => {
    return fs.readdirSync(dir).filter((file) => {
      if (file !== 'base') {
        return fs.statSync(path.join(dir, file)).isDirectory();
      }
    });
  };

  let currentBanners = getFolders('./src');

  this.prompt([{
    type: 'list',
    name: 'bannerMaster',
    message: 'Which banner do you want to copy?',
    choices: currentBanners,
    default: currentBanners[0]
  }, {
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
    message: 'What is the name of the new format?:',
    default: (answer) => {
      var name = this.appname + '-' + answer.bannerWidth + 'x' + answer.bannerHeight;
      return name;
    },
    filter: (answer) => {
      var hyphenate = answer.replace(/\s+/g, '-');
      return hyphenate;
    }
  }, {
    type: 'list',
    name: 'bannerType',
    message: 'What type of banner is it?',
    choices: ['DoubleClick Studio', 'Sizmek', 'Adform', 'DCM', 'Atlas', 'Flashtalking', 'IAB'],
    default: 'DoubleClick Studio'
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
