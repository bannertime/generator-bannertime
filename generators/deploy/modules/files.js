'use strict';

module.exports = function(Bannertime) {

  /**
   * Process the deploy script and task.
   */
  Bannertime.prototype.processDeployScript = function() {
    var props = {
      deployUser: this.props.deployUser,
      deployDomain: this.props.deployDomain
    }
    this.fs.copyTpl(
      this.templatePath('_deploy.sh'),
      this.destinationPath('gulpfile.js/lib/deploy.sh'),
      props
    );
    this.fs.copy(
      this.templatePath('deploy.js'),
      this.destinationPath('gulpfile.js/tasks/deploy.js')
    );
  };

};
