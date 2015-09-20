'use strict';

module.exports = function(Bannertime) {

  /**
   * Install dependencies from the package.json file.
   */
  Bannertime.prototype.install = function install() {
    if (this.props.includeGsap === true) {
      this.npmInstall(['gsap'], {
        'saveDev': true
      });
    };

    this.npmInstall();
  };

};
