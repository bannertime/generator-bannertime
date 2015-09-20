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

    console.log('File structure set up now running npm install'.green);
    this.npmInstall();
  };

};
