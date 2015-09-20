'use strict';

Banner.prototype.start = function() {
  var _this = this;
  this.preloadImages(this.images, function() {
    _this.createElements();
    _this.setup();
    _this.hidePreloader();
    _this.animate();
  });
};

Banner.prototype.createElements = function() {
  this.banner = document.querySelector('.banner');
  this.logo = this.smartObject({
    backgroundImage: 'images/logo.png',
    width: 294,
    height: 51,
    parent: this.banner
  });
};

Banner.prototype.setup = function() {
  this.logo.center();
  this.logo.set({autoAlpha: 0, scale: 0.4});
};

Banner.prototype.hidePreloader = function() {
  TweenLite.to('.preloader', 1, {autoAlpha: 0});
};

Banner.prototype.animate = function() {
  var timeline = new TimelineLite({onComplete: loop})
    .addLabel('start', 0)
    .add(TweenLite.to(this.logo, 2, {autoAlpha: 1, scale: 0.7, delay: 1, ease: Elastic.easeOut}))
    .add(TweenLite.to(this.logo, 1, {autoAlpha: 0, scale: 0.4, delay: 1}));

  function loop() {
    timeline.gotoAndPlay('start');
  }
};

