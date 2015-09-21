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

    this.log('File structure set up now running npm install'.green);
    this.log('This may take a few minutes...'.green);
    this.log('Please be patient!'.red);
    this.npmInstall();
  };

};
