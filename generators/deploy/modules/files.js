'use strict';

var Download = require('download');
var path = require('path');

module.exports = function(Bannertime) {

  /**
   * Add the homepage to the package.json file.
   */
  Bannertime.prototype.processPackageJson = function() {
    var filePath = this.destinationPath('package.json');
    var options = {
      deployHomepage: this.props.deployHomepage,
    };
    this.fs.copy(filePath, filePath, {
      process: function(content) {
        var regEx = new RegExp('  "devDependencies": {');
        var homepageExist = new RegExp('"homepage": "(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?",');
        if (content.toString().match(homepageExist)) {
          var newContent = content.toString().replace(homepageExist, '"homepage": "' + options.deployHomepage + '",');
        } else {
          var newContent = content.toString().replace(regEx, '  "homepage": "' + options.deployHomepage + '",\n  "devDependencies": {');
        }
        return newContent;
      }
    });
  };

  /**
   * Process the config file.
   */
  Bannertime.prototype.processConfig = function() {
    var filePath = './gulpfile.js/config.js';
    var options = {
      username: this.props.deployUsername,
      domain: this.props.deployDomain,
      origin: this.props.deployOrigin,
      branch: this.props.deployBranch,
    };
    this.fs.copy(filePath, filePath, {
      process: function(content) {
        var regEx = new RegExp('    \'fonts\': {');
        var newContent = content.toString().replace(regEx, '    \'deploy\': {\n      \'username\': \'' + options.username + '\',\n      \'domain\': \'' + options.domain + '\',\n      \'origin\': \'' + options.origin + '\',\n      \'branch\': \'' + options.branch + '\'\n    },\n\n    \'fonts\': {');
        return newContent;
      }
    });
  };

  /**
   * Copy the deploy task files.
   */
  Bannertime.prototype.copyDeployTask = function() {
    this.fs.copy(
      this.templatePath('handleDeploy.js'),
      this.destinationPath('gulpfile.js/lib/handleDeploy.js')
    );
    this.fs.copy(
      this.templatePath('git.js'),
      this.destinationPath('gulpfile.js/lib/git.js')
    );
    this.fs.copy(
      this.templatePath('deploy.js'),
      this.destinationPath('gulpfile.js/tasks/deploy.js')
    );
  };

};
