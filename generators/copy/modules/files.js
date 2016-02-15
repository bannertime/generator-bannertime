'use strict';

var Download = require('download');
var path = require('path');

module.exports = function(Bannertime) {

  /**
   * Set the default html file based on the type of banner.
   */
  Bannertime.prototype.bannerType = function() {
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
   * Process the preview html file.
   */
  Bannertime.prototype.previewHtml = function() {
    var filePath = './src/index.html';
    var indexOptions = {
      bannerName: this.props.bannerName,
    };
    this.fs.copy(filePath, filePath, {
      process: function(content) {
        var regEx = new RegExp('</ul>');
        var newContent = content.toString().replace(regEx, '  <li><a href="' + indexOptions.bannerName + '/" class="done">' + indexOptions.bannerName + '</a></li>\n      </ul>');
        return newContent;
      }
    });
  };

  /**
   * Process the banner html file.
   */
  Bannertime.prototype.html = function() {
    var indexOptions = {
      bannerName: this.props.bannerName,
      bannerType: this.props.bannerType,
      bannerWidth: this.props.bannerWidth,
      bannerHeight: this.props.bannerHeight,
      includeOfflineEnabler: this.props.includeOfflineScripts
    };
    this.fs.copyTpl(
      this.templatePath('../../app/templates/src/300x250/_index.html'),
      this.destinationPath('src/' + this.props.bannerName + '/index.html'),
      indexOptions
    );
  };

  /**
   * Process the banner scss files.
   */
  Bannertime.prototype.scss = function() {
    var styleOptions = {
      bannerWidth: this.props.bannerWidth,
      bannerHeight: this.props.bannerHeight
    };

    this.fs.copy(
      this.destinationPath('src/' + this.props.bannerMaster + '/styles/style.scss'),
      this.destinationPath('src/' + this.props.bannerName + '/styles/style.scss')
    );
    this.fs.copy(
      this.destinationPath('src/' + this.props.bannerMaster + '/styles/base/_banner.scss'),
      this.destinationPath('src/' + this.props.bannerName + '/styles/base/_banner.scss'), {
      process: function(content) {
        var regExWidth = new RegExp(/\$banner-width:\s*[0-9]*px;/);
        var regExHeight = new RegExp(/\$banner-height:\s*[0-9]*px;/);
        var newContent = content.toString()
          .replace(regExWidth, '$banner-width: ' + styleOptions.bannerWidth + 'px;')
          .replace(regExHeight, '$banner-height: ' + styleOptions.bannerHeight + 'px;');
        return newContent;
      }
    });
    this.fs.copy(
      this.destinationPath('src/' + this.props.bannerMaster + '/styles/base/_preloader.scss'),
      this.destinationPath('src/' + this.props.bannerName + '/styles/base/_preloader.scss')
    );
  };

  /**
   * Process the banner js files.
   */
  Bannertime.prototype.js = function() {
    if (this.props.bannerType == 'Sizmek') {
      this.fs.copy(
        this.destinationPath('src/' + this.props.bannerMaster + '/js/EBLoader.js'),
        this.destinationPath('src/' + this.props.bannerName + '/js/EBLoader.js')
      );
    }
    if (this.props.bannerType == 'Adform') {
      this.fs.copy(
        this.destinationPath('src/' + this.props.bannerMaster + '/js/AdformDHTML.js'),
        this.destinationPath('src/' + this.props.bannerName + '/js/AdformDHTML.js')
      );
    }
    this.fs.copy(
      this.destinationPath('src/' + this.props.bannerMaster + '/js/banner.js'),
      this.destinationPath('src/' + this.props.bannerName + '/js/banner.js')
    );
    this.fs.copy(
      this.templatePath('../../app/templates/src/300x250/js/loader.' + this.bannerSuffix + '.js'),
      this.destinationPath('src/' + this.props.bannerName + '/js/banner.loader.js')
    );
    this.fs.copy(
      this.destinationPath('src/' + this.props.bannerMaster + '/js/banner.animation.js'),
      this.destinationPath('src/' + this.props.bannerName + '/js/banner.animation.js')
    );
  };

  /**
   * Process the banner manifest file.
   */
  Bannertime.prototype.manifest = function() {
    if (this.props.bannerType == 'Adform') {
      var manifestOptions = {
        bannerName: this.props.bannerName,
        bannerDesc: this.props.bannerDesc,
        bannerWidth: this.props.bannerWidth,
        bannerHeight: this.props.bannerHeight,
      };
      this.fs.copyTpl(
        this.templatePath('../../app/templates/src/300x250/js/_manifest.json'),
        this.destinationPath('src/' + this.props.bannerName + '/manifest.json'),
        manifestOptions
      );
    }
  };

  /**
   * Process the banner images.
   */
  Bannertime.prototype.images = function() {
    this.directory(this.destinationPath('src/' + this.props.bannerMaster + '/images'), 'src/' + this.props.bannerName + '/images');
  };

  /**
   * Include offline vendor scripts.
   */
  Bannertime.prototype.vendorScripts = function() {
    function getVendorScript(vendor) {
      var script = {
        'DoubleClick': 'https://s0.2mdn.net/ads/studio/Enabler.js',
        'Sizmek': 'https://secure-ds.serving-sys.com/BurstingScript/EBLoader.js',
        'Adform': 'https://s1.adform.net/banners/scripts/rmb/Adform.DHTML.js'
      };
      return script[vendor];
    }
    if (this.props.includeOfflineScripts === true) {
      new Download({
        mode: '755'
      })
        .get(getVendorScript(this.props.bannerType))
        .dest('offline')
        .run();
    }
  };

};