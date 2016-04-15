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
      this.bannerSuffix = 'doubleclick';
  }

  const props = {
    bannerName: this.props.bannerName,
    bannerDesc: this.props.bannerDesc,
    bannerType: this.props.bannerType,
    bannerWidth: 300,
    bannerHeight: 250,
    bannerRepo: this.props.bannerRepo,
    includeOfflineEnabler: this.props.includeOfflineScripts,
  };

  /**
   * Process the html files.
   */
  this.fs.copyTpl(
    this.templatePath('src/_index.html'),
    this.destinationPath('src/index.html'),
    props
  );
  this.fs.copyTpl(
    this.templatePath('src/300x250/_index.html'),
    this.destinationPath(`src/${this.props.bannerName}-300x250/index.html`),
    props
  );

  /**
   * Process the scss files.
   */
  this.fs.copyTpl(
    this.templatePath('src/base/styles/style.scss'),
    this.destinationPath('src/base/styles/style.scss'),
    props
  );
  this.fs.copyTpl(
    this.templatePath('src/300x250/styles/style.scss'),
    this.destinationPath(`src/${this.props.bannerName}-300x250/styles/style.scss`),
    props
  );
  this.fs.copyTpl(
    this.templatePath('src/300x250/styles/base/banner.scss'),
    this.destinationPath(`src/${this.props.bannerName}-300x250/styles/base/_banner.scss`),
    props
  );
  this.fs.copyTpl(
    this.templatePath('src/300x250/styles/base/preloader.scss'),
    this.destinationPath(`src/${this.props.bannerName}-300x250/styles/base/_preloader.scss`),
    props
  );

  /**
   * Process the js files.
   */
  this.fs.copy(
    this.templatePath('src/base/js/main.js'),
    this.destinationPath('src/base/js/main.js')
  );
  this.fs.copy(
    this.templatePath('src/300x250/js/banner.js'),
    this.destinationPath(`src/${this.props.bannerName}-300x250/js/banner.js`)
  );
  this.fs.copy(
    this.templatePath('src/300x250/js/createElements.js'),
    this.destinationPath(`src/${this.props.bannerName}-300x250/js/createElements.js`)
  );
  this.fs.copy(
    this.templatePath('src/300x250/js/setup.js'),
    this.destinationPath(`src/${this.props.bannerName}-300x250/js/setup.js`)
  );
  this.fs.copy(
    this.templatePath('src/300x250/js/start.js'),
    this.destinationPath(`src/${this.props.bannerName}-300x250/js/start.js`)
  );
  this.fs.copy(
    this.templatePath('src/300x250/js/animate.js'),
    this.destinationPath(`src/${this.props.bannerName}-300x250/js/animate.js`)
  );
  this.directory('src/modules', 'src/modules');
  // TODO: refactor how loaders work
  if (this.props.bannerType === 'Sizmek') {
    this.fs.copy(
      this.templatePath('src/modules/EBLoader.js'),
      this.destinationPath(`src/${this.props.bannerName}-300x250/js/EBLoader.js`)
    );
  }
  if (this.props.bannerType === 'Adform') {
    this.fs.copy(
      this.templatePath('src/modules/AdformDHTML.js'),
      this.destinationPath(`src/${this.props.bannerName}-300x250/js/AdformDHTML.js`)
    );
  }
  // TODO: replace the template type using the banner suffix
  this.fs.copy(
    this.templatePath(`src/modules/loader.${this.bannerSuffix}.js`),
    this.destinationPath(`src/${this.props.bannerName}-300x250/js/loader.js`)
  );

  /**
   * Retrieve banner properties to create the package.json.
   */
  this.fs.copyTpl(
    this.templatePath('_package.json'),
    this.destinationPath('package.json'),
    props
  );

  /**
   * Process the readme file.
   */
  this.fs.copyTpl(
    this.templatePath('_README.md'),
    this.destinationPath('README.md'),
    props
  );

  /**
   * Process the config files.
   */
  this.fs.copy(
    this.templatePath('editorconfig'),
    this.destinationPath('.editorconfig')
  );
  this.fs.copy(
    this.templatePath('gitignore'),
    this.destinationPath('.gitignore')
  );
  this.fs.copy(
    this.templatePath('eslintrc'),
    this.destinationPath('.eslintrc')
  );
  this.fs.copy(
    this.templatePath('babelrc'),
    this.destinationPath('.babelrc')
  );

  /**
   * Process the images.
   */
  this.directory('src/base/images', 'src/base/images');
  this.directory('src/300x250/images', `src/${this.props.bannerName}-300x250/images`);

  /**
   * Process the gulp tasks.
   */
  this.directory('gulpfile.babel.js', 'gulpfile.babel.js');

  /**
   * Process the manifest file.
   */
  if (this.props.bannerType === 'Adform') {
    this.fs.copyTpl(
      this.templatePath('src/300x250/js/_manifest.json'),
      this.destinationPath(`src/${this.props.bannerName}-300x250/manifest.json`),
      props
    );
  }
  if (this.props.bannerType === 'Flashtalking') {
    this.fs.copyTpl(
      this.templatePath('src/300x250/js/_manifest.flashtalking.js'),
      this.destinationPath(`src/${this.props.bannerName}-300x250/manifest.js`),
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
