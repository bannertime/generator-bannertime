'use strict';

var Download = require('download');

module.exports = function(Bannertime) {

  /**
   * Set the default html file based on the type of banner.
   * Options: DoubleClick, Sizmek, Adform, None.
   */
  Bannertime.prototype.bannerType = function bannerType() {
    switch(this.props.bannerType) {
      case 'DoubleClick':
        this.bannerSuffix = 'doubleclick';
        break;
      case 'Sizmek':
        this.bannerSuffix = 'sizmek';
        break;
      case 'Adform':
        this.bannerSuffix = 'adform';
        break;
      case 'DCM':
        this.bannerSuffix = 'dcm';
        break;
      case 'Atlas':
        this.bannerSuffix = 'atlas';
        break;
      case 'None':
        this.bannerSuffix = 'none';
        break;
      default:
        this.bannerSuffix = 'doubleclick'
    }
    var bannerType = this.props.bannerType;
  };

  /**
   * Retrieve banner properties to create the package.json.
   */
  Bannertime.prototype.bannerOptions = function bannerOptions() {
    var packageOptions = {
      bannerName: this.props.bannerName,
      bannerSize: this.props.bannerSize,
      bannerDesc: this.props.bannerDesc,
      bannerRepo: this.props.bannerRepo
    }
    this.fs.copyTpl(
      this.templatePath('_package.json'),
      this.destinationPath('package.json'),
      packageOptions
    );
  };

  /**
   * Process the chosen html file.
   */
  Bannertime.prototype.html = function html() {
    var indexOptions = {
      title: this.props.bannerName,
      bannerType: this.props.bannerType,
      bannerWidth: this.props.bannerWidth,
      bannerHeight: this.props.bannerHeight,
      includeOfflineEnabler: this.props.includeOfflineEnabler
    }
    this.fs.copyTpl(
      this.templatePath('src/index.html'),
      this.destinationPath('src/index.html'),
      indexOptions
    );
    this.fs.copyTpl(
      this.templatePath('src/300x250/_index.html'),
      this.destinationPath('src/300x250/index.html'),
      indexOptions
    );
  };

  /**
   * Process the scss files.
   */
  Bannertime.prototype.scss = function scss() {
    var styleOptions = {
      bannerWidth: this.props.bannerWidth,
      bannerHeight: this.props.bannerHeight
    }
    this.fs.copyTpl(
      this.templatePath('src/base/styles/style.scss'),
      this.destinationPath('src/base/styles/style.scss'),
      styleOptions
    );
    this.fs.copyTpl(
      this.templatePath('src/300x250/styles/style.scss'),
      this.destinationPath('src/300x250/styles/style.scss'),
      styleOptions
    );
    this.fs.copyTpl(
      this.templatePath('src/300x250/styles/base/banner.scss'),
      this.destinationPath('src/300x250/styles/base/_banner.scss'),
      styleOptions
    );
    this.fs.copyTpl(
      this.templatePath('src/300x250/styles/base/preloader.scss'),
      this.destinationPath('src/300x250/styles/base/_preloader.scss'),
      styleOptions
    );
  };

  /**
   * Process the js files.
   */
  Bannertime.prototype.js = function js() {
    this.fs.copy(
      this.templatePath('src/base/js/main.js'),
      this.destinationPath('src/base/js/main.js')
    );
    if (this.props.bannerType == 'Sizmek') {
      this.fs.copy(
        this.templatePath('src/300x250/js/libs/EBLoader.js'),
        this.destinationPath('src/300x250/js/EBLoader.js')
      );
    }
    if (this.props.bannerType == 'Adform') {
      this.fs.copy(
        this.templatePath('src/300x250/js/libs/AdformDHTML.js'),
        this.destinationPath('src/300x250/js/AdformDHTML.js')
      );
    }
    this.fs.copy(
      this.templatePath('src/300x250/js/banner.js'),
      this.destinationPath('src/300x250/js/banner.js')
    );
    this.fs.copy(
      this.templatePath('src/300x250/js/loader.' + this.bannerSuffix + '.js'),
      this.destinationPath('src/300x250/js/banner.loader.js')
    );
    this.fs.copy(
      this.templatePath('src/300x250/js/animation.js'),
      this.destinationPath('src/300x250/js/banner.animation.js')
    );
  };

  /**
   * Process the manifest file.
   */
  Bannertime.prototype.manifest = function manifest() {
    if (this.props.bannerType == 'Adform') {
      var manifestOptions = {
        bannerName: this.props.bannerName,
        bannerDesc: this.props.bannerDesc,
        bannerWidth: this.props.bannerWidth,
        bannerHeight: this.props.bannerHeight,
      }
      this.fs.copyTpl(
        this.templatePath('src/300x250/js/_manifest.json'),
        this.destinationPath('src/300x250/manifest.json'),
        manifestOptions
      );
    }
  };

  /**
   * Process the readme file.
   */
  Bannertime.prototype.readme = function readme() {
    var readmeOptions = {
      bannerName: this.props.bannerName,
      bannerDesc: this.props.bannerDesc
    }
    this.fs.copyTpl(
      this.templatePath('_README.md'),
      this.destinationPath('README.md'),
      readmeOptions
    );
  };

  /**
   * Copy the config files.
   */
  Bannertime.prototype.config = function config() {
    this.fs.copy(
      this.templatePath('editorconfig'),
      this.destinationPath('.editorconfig')
    );
    this.fs.copy(
      this.templatePath('gitignore'),
      this.destinationPath('.gitignore')
    );
    this.fs.copy(
      this.templatePath('jshintrc'),
      this.destinationPath('.jshintrc')
    );
  };

  /**
   * Process the images.
   */
  Bannertime.prototype.images = function images() {
    this.directory('src/base/images', 'src/base/images');
    this.directory('src/300x250/images', 'src/300x250/images');
  };

  /**
   * Process the gulp tasks.
   */
  Bannertime.prototype.gulp = function gulp() {
    this.directory('gulpfile.js', 'gulpfile.js');
    var zipOptions = {
      archiveName: this.props.archiveName
    }
    this.fs.copyTpl(
      this.templatePath('gulpfile.js/config/_zip.js'),
      this.destinationPath('gulpfile.js/config/zip.js'),
      zipOptions
    );
  };

  /**
   * Include offline doubleclick enabler.
   */
  Bannertime.prototype.doubleclick = function doubleclick() {
    if (this.props.includeOfflineEnabler == true) {
      new Download({
          mode: '755'
        })
        .get('https://s0.2mdn.net/ads/studio/Enabler.js')
        .dest('offline')
        .run();
    }
  };

};
