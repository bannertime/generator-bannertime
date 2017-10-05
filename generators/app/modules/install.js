/**
 * Install the dependencies.
 */

module.exports = function install() {
  if (!this.options['skip-install']) {
    this.installDependencies({
      bower: false,
      npm: true
    });
  }

  if (this.props.includeOfflineScripts === true) {
    this.npmInstall(['gsap'], {
      skipInstall: this.options['skip-install'],
      dev: true
    });
  }
};
