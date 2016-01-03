'use strict';

var path = require('path');
var s = require('underscore.string');

module.exports = function(Bannertime) {

  /**
   * The questions that the sub-generator will ask.
   */
  Bannertime.prototype.prompts = function() {
    var done = this.async();
    var bannerName = this.appname;
    var prompts = [{
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
      default: function(answer) {
        var name = bannerName + '-' + answer.bannerWidth + 'x' + answer.bannerHeight;
        return name;
      },
      filter: function(answer) {
        return s.slugify(answer)
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
