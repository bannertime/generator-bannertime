/**
 * Install the dependencies.
 */

module.exports = function() {
  if (!this.options['skip-install']) {
    this.installDependencies({
      bower: false,
      npm: false,
      yarn: true
    });
  }

  if (this.props.includeOfflineScripts === true) {
    this.yarnInstall(['gsap'], {
      skipInstall: this.options['skip-install'],
      dev: true
    });
  }
};
