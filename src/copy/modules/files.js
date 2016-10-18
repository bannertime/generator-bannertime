'use strict';

/*
 * Generate files and process them.
 */

import Download from 'download';
import path from 'path';

export default function() {

  /**
   * Set the default html file based on the type of banner.
   */
  switch(this.props.bannerType) {
    case 'DoubleClick Studio':
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
    case 'Flashtalking':
      this.bannerSuffix = 'flashtalking';
      break;
    case 'None':
      this.bannerSuffix = 'none';
      break;
    default:
      this.bannerSuffix = 'doubleclick'
  }

  let props = {
    bannerName: this.props.bannerName,
    bannerDesc: this.props.bannerDesc,
    bannerType: this.props.bannerType,
    bannerWidth: this.props.bannerWidth,
    bannerHeight: this.props.bannerHeight,
    bannerRepo: this.props.bannerRepo,
    includeOfflineEnabler: this.props.includeOfflineScripts
  };

  /**
   * Process the html files.
   */
  let filePath = './src/index.html';
  this.fs.copy(filePath, filePath, {
    process: (content) => {
      var regEx = new RegExp('</ul>');
      var newContent = content.toString().replace(regEx, '  <li><a href="' + props.bannerName + '/" class="done">' + props.bannerName + '</a></li>\n      </ul>');
      return newContent;
    }
  });
  this.fs.copyTpl(
    this.templatePath('../../app/templates/src/300x250/_index.html'),
    this.destinationPath('src/' + this.props.bannerName + '/index.html'),
    props
  );

  /**
   * Process the scss files.
   */
  this.directory(this.destinationPath('src/' + this.props.bannerMaster + '/styles'), 'src/' + this.props.bannerName + '/styles');
  this.fs.copy(
    this.destinationPath('src/' + this.props.bannerMaster + '/styles/base/_banner.scss'),
    this.destinationPath('src/' + this.props.bannerName + '/styles/base/_banner.scss'), {
    process: (content) => {
      var regExWidth = new RegExp(/\$banner-width:\s*[0-9]*px;/);
      var regExHeight = new RegExp(/\$banner-height:\s*[0-9]*px;/);
      var newContent = content.toString()
        .replace(regExWidth, '$banner-width: ' + props.bannerWidth + 'px;')
        .replace(regExHeight, '$banner-height: ' + props.bannerHeight + 'px;');
      return newContent;
    }
  });

  /**
   * Process the js files.
   */
  this.directory(this.destinationPath('src/' + this.props.bannerMaster + '/js'), 'src/' + this.props.bannerName + '/js');
  this.fs.copy(
    this.templatePath('../../app/templates/src/300x250/js/loader.' + this.bannerSuffix + '.js'),
    this.destinationPath('src/' + this.props.bannerName + '/js/banner.loader.js')
  );
  if (this.props.bannerType == 'Sizmek') {
    this.fs.copy(
      this.templatePath('../../app/templates/src/300x250/js/libs/EBLoader.js'),
      this.destinationPath('src/' + this.props.bannerName + '/js/EBLoader.js')
    );
  }
  if (this.props.bannerType == 'Adform') {
    this.fs.copy(
      this.templatePath('../../app/templates/src/300x250/js/libs/AdformDHTML.js'),
      this.destinationPath('src/' + this.props.bannerName + '/js/AdformDHTML.js')
    );
  }

  /**
   * Process the images.
   */
  this.directory(this.destinationPath('src/' + this.props.bannerMaster + '/images'), 'src/' + this.props.bannerName + '/images');

  /**
   * Process the manifest file.
   */
  if (this.props.bannerType == 'Adform') {
    this.fs.copyTpl(
      this.templatePath('../../app/templates/src/300x250/js/_manifest.json'),
      this.destinationPath('src/' + this.props.bannerName + '/manifest.json'),
      props
    );
  }
  if (this.props.bannerType == 'Flashtalking') {
    this.fs.copyTpl(
      this.templatePath('../../app/templates/src/300x250/js/_manifest.flashtalking.js'),
      this.destinationPath('src/' + this.props.bannerName + '/manifest.js'),
      props
    );
  }

  /**
   * Process the offline vendor scripts.
   */
  if (this.props.includeOfflineScripts === true) {
    let getVendorScript = (vendor) => {
      let script = {
        'DoubleClick Studio': 'https://s0.2mdn.net/ads/studio/Enabler.js',
        'Sizmek': 'https://secure-ds.serving-sys.com/BurstingScript/EBLoader.js',
        'Adform': 'https://s1.adform.net/banners/scripts/rmb/Adform.DHTML.js'
      };
      return script[vendor];
    }
    new Download({
      mode: '755'
    })
      .get(getVendorScript(this.props.bannerType))
      .dest('offline')
      .run();
  }

}
