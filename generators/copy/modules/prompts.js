'use strict';

var fs = require('fs');
var path = require('path');
var s = require('underscore.string');

module.exports = function(Bannertime) {

  /**
   * The questions that the sub-generator will ask.
   */
  Bannertime.prototype.prompts = function() {
    var done = this.async();
    var bannerName = this.appname;
    function getFolders(dir) {
      return fs.readdirSync(dir)
        .filter(function(file) {
          if (file !== 'base') {
            return fs.statSync(path.join(dir, file)).isDirectory();
          }
        });
    }
    var currentBanners = getFolders('./src');
    var prompts = [{
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
      default: function(answer) {
        var name = bannerName + '-' + answer.bannerWidth + 'x' + answer.bannerHeight;
        return name;
      },
      filter: function(answer) {
        var hyphenate = answer.replace(/\s+/g, '-');
        return hyphenate;
      }
    }, {
      type: 'list',
      name: 'bannerType',
      message: 'What type of banner is it?',
      choices: ['DoubleClick', 'Sizmek', 'Adform', 'DCM', 'Atlas', 'None'],
      default: 'DoubleClick'
    }, {
      type: 'confirm',
      name: 'includeOfflineScripts',
      message: 'Include vendor scripts for offline use?',
      default: false
    }];

    this.prompt(prompts, function(props) {
      this.props = props;
      done();
    }.bind(this));
  };

};
