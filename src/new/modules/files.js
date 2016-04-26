/*
 * Generate files and process them.
 */

import Download from 'download';

export default function () {
  /**
   * Set the default html file based on the type of banner.
   */
  switch (this.props.bannerType) {
    case 'DoubleClick':
      this.bannerSuffix = 'doubleclick';
      break;
    case 'Sizmek':
      this.bannerSuffix = 'sizmek';
      break;
    default:
      this.bannerSuffix = 'none';
  }

  const props = {
    bannerName: this.props.bannerName,
    bannerDesc: this.props.bannerDesc,
    bannerType: this.props.bannerType,
    bannerSuffix: this.bannerSuffix,
    bannerWidth: this.props.bannerWidth,
    bannerHeight: this.props.bannerHeight,
    bannerRepo: this.props.bannerRepo,
    includeOfflineEnabler: this.props.includeOfflineScripts,
  };

  /**
   * Process the html files.
   */
  const filePath = './src/index.html';
  this.fs.copy(filePath, filePath, {
    process: (content) => {
      const regEx = new RegExp('</ul>');
      const string = `  <li><a href="${props.bannerName}/" class="done">${props.bannerName}</a></li>\n      </ul>`;
      const newContent = content.toString().replace(regEx, string);
      return newContent;
    },
  });
  this.fs.copyTpl(
    this.templatePath('../../app/templates/src/300x250/_index.html'),
    this.destinationPath(`src/${this.props.bannerName}/index.html`),
    props
  );

  /**
   * Process the scss files.
   */
  this.fs.copyTpl(
    this.templatePath('../../app/templates/src/300x250/styles/style.scss'),
    this.destinationPath(`src/${this.props.bannerName}/styles/style.scss`),
    props
  );
  this.fs.copy(
    this.templatePath('../../app/templates/src/300x250/styles/base/banner.scss'),
    this.destinationPath(`src/${this.props.bannerName}/styles/base/_banner.scss`), {
      process: (content) => {
        const regExWidth = new RegExp(/\$banner-width:\s*[0-9]*px;/);
        const regExHeight = new RegExp(/\$banner-height:\s*[0-9]*px;/);
        const newContent = content.toString()
          .replace(regExWidth, `$banner-width: ${props.bannerWidth}px;`)
          .replace(regExHeight, `$banner-height: ${props.bannerHeight}px;`);
        return newContent;
      },
    }
  );
  this.fs.copyTpl(
    this.templatePath('../../app/templates/src/300x250/styles/base/preloader.scss'),
    this.destinationPath(`src/${this.props.bannerName}/styles/base/_preloader.scss`),
    props
  );

  /**
   * Process the js files.
   */
  this.fs.copyTpl(
    this.templatePath('../../app/templates/src/300x250/js/_banner.js'),
    this.destinationPath(`src/${this.props.bannerName}/js/banner.js`),
    props
  );
  this.fs.copy(
    this.templatePath('../../app/templates/src/300x250/js/createElements.js'),
    this.destinationPath(`src/${this.props.bannerName}/js/createElements.js`)
  );
  this.fs.copy(
    this.templatePath('../../app/templates/src/300x250/js/setup.js'),
    this.destinationPath(`src/${this.props.bannerName}/js/setup.js`)
  );
  this.fs.copy(
    this.templatePath('../../app/templates/src/300x250/js/start.js'),
    this.destinationPath(`src/${this.props.bannerName}/js/start.js`)
  );
  this.fs.copy(
    this.templatePath('../../app/templates/src/300x250/js/animate.js'),
    this.destinationPath(`src/${this.props.bannerName}/js/animate.js`)
  );

  /**
   * Process the images.
   */
  this.directory(
    '../../app/templates/src/300x250/images',
    `src/${this.props.bannerName}/images`
  );

  /**
   * Process the manifest file.
   */
  if (this.props.bannerType === 'Adform') {
    this.fs.copyTpl(
      this.templatePath('../../app/templates/src/300x250/js/_manifest.json'),
      this.destinationPath(`src/${this.props.bannerName}/manifest.json`),
      props
    );
  }
  if (this.props.bannerType === 'Flashtalking') {
    this.fs.copyTpl(
      this.templatePath('../../app/templates/src/300x250/js/_manifest.flashtalking.js'),
      this.destinationPath(`src/${this.props.bannerName}/manifest.js`),
      props
    );
  }

  /**
   * Process the offline vendor scripts.
   */
  if (this.props.includeOfflineScripts === true) {
    const getVendorScript = (vendor) => {
      const script = {
        DoubleClick: 'https://s0.2mdn.net/ads/studio/Enabler.js',
        Sizmek: 'https://secure-ds.serving-sys.com/BurstingScript/EBLoader.js',
        Adform: 'https://s1.adform.net/banners/scripts/rmb/Adform.DHTML.js',
      };
      return script[vendor];
    };
    new Download({ mode: '755' })
      .get(getVendorScript(this.props.bannerType))
      .dest('offline')
      .run();
  }
}
