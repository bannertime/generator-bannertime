'use strict';

/**
 * Run the animation functions.
 */
Banner.prototype.start = function () {
  this.banner = document.querySelector('.banner');

  this.bannerWidth = this.banner.offsetWidth;
  this.bannerHeight = this.banner.offsetHeight;

  // Image array for preloading
  this.images = [
    'images/logo.png'
  ];

  var _this = this;
  this.preloadImages(this.images, function () {
    _this.createElements();
    _this.setup();
    _this.hidePreloader();
    _this.animate();
    _this.bindEvents();
  });
};

/**
 * Create dom elements.
 */
Banner.prototype.createElements = function () {
  this.logo = this.smartObject({
    backgroundImage: 'images/logo.png',
    retina: true,
    parent: this.banner
  });
};

/**
 * Setup initial element states.
 */
Banner.prototype.setup = function () {
  this.logo.center();
  this.logo.set({ autoAlpha: 0, scale: 0.4 });
};

/**
 * Hide the preloader.
 */
Banner.prototype.hidePreloader = function () {
  gsap.to('.preloader', { duration: 1, autoAlpha: 0 });
};

/**
 * Animation timeline.
 */
Banner.prototype.animate = function () {
  this.timeline = gsap.timeline({
      repeat: 3
    })
    .addLabel('start', 0)
    .to(this.logo, {
      duration: 2,
      autoAlpha: 1,
      scale: 0.7,
      delay: 1,
      ease: 'elastic.out(1, 0.3)'
    })
    .to(this.logo, {
      duration: 1,
      autoAlpha: 0,
      scale: 0.4,
      delay: 1
    });
};
