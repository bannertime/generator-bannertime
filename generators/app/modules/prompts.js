'use strict';

var camelCase = require('camelcase');
var path = require('path');
var s = require('underscore.string');

module.exports = function(Bannertime) {

  /**
   * The questions that the generator will ask.
   */
  Bannertime.prototype.prompts = function prompts() {
    var done = this.async();

    var bannerSize = 'default';

    var prompts = [{
      type: 'input',
      name: 'bannerName',
      message: 'What is the name of the banner? (camelCase):',
      default: this.appname,
      filter: function(answer) {
        return camelCase(answer)
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
      choices: ['DoubleClick', 'Sizmek', 'Adform', 'Standard'],
      default: 'DoubleClick'
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
      name: 'bannerRepo',
      message: 'What is the link to the repository?',
      default: 'http://github.com/pyramidium/generator-bannertime'
    }, {
      type: 'input',
      name: 'archiveName',
      message: 'When the ad is zipped, what should it be called? ',
      default: function(answers) {
        return answers.bannerName + '-' + answers.bannerWidth + 'x' + answers.bannerHeight + '.zip'
      }
    }, {
      type: 'confirm',
      name: 'includeGsap',
      message: 'Include GSAP for offline use?',
      default: false
    }, {
      when: function (answers) {
          return answers.bannerType === 'DoubleClick';
        }, type: 'confirm',
        name: 'includeOfflineEnabler',
        message: "Include DoubleClick Enabler for offline use?",
        default: false
    }];

    this.prompt(prompts, function(props) {
      this.props = props;
      done();
    }.bind(this));
  };

  /**
   * Determine the appName either from the current directory or the parameter of the generator
   */
  Bannertime.prototype.determineAppName = function determineAppName() {
    this.appName = this.appName || path.basename(process.cwd());
    this.appName = s.camelize(s.slugify(s.humanize(this.appName)));
  };

};
