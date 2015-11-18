'use strict';

var path = require('path');
var s = require('underscore.string');

module.exports = function(Bannertime) {

  /**
   * The questions that the generator will ask.
   */
  Bannertime.prototype.prompts = function() {
    var done = this.async();
    var bannerSize = 'default';
    var prompts = [{
      type: 'input',
      name: 'bannerName',
      message: 'What is the name of the banner? (kebab-case):',
      default: this.appname,
      filter: function(answer) {
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
      choices: ['DoubleClick', 'Sizmek', 'Adform', 'DCM', 'Atlas', 'None'],
      default: 'DoubleClick'
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
        return answers.bannerName + '.zip'
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
   * Determine the appName either from the current directory or the parameter of the generator.
   */
  Bannertime.prototype.determineAppName = function() {
    this.appName = this.appName || path.basename(process.cwd());
    this.appName = s.slugify(s.humanize(this.appName));
    console.log(this.appName);
  };

};
