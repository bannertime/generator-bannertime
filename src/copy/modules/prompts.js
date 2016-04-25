/**
 * The questions that the sub-generator will ask.
 */

import fs from 'fs';
import path from 'path';

export default function () {
  if (this.skipConfig) return;
  const cb = this.async();

  const getFolders = p => fs.readdirSync(p).filter(f => fs.statSync(path.join(p, f)).isDirectory());
  const currentBanners = getFolders('./src');
  const base = currentBanners.indexOf('base');
  const modules = currentBanners.indexOf('modules');
  if (base > -1) currentBanners.splice(base, 1);
  if (modules > -1) currentBanners.splice(modules, 1);

  this.prompt([{
    type: 'list',
    name: 'bannerMaster',
    message: 'Which banner do you want to copy?',
    choices: currentBanners,
    default: currentBanners[0],
  }, {
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
    message: 'What is the name of the new format?:',
    default: (answer) => `${this.appname}-${answer.bannerWidth}x${answer.bannerHeight}`,
    filter: (answer) => answer.replace(/\s+/g, '-'),
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
