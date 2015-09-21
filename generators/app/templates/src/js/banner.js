'use strict';

var Banner = function() {
  this.loader();
  this.imageCache = {};
};

Banner.prototype.onInit = function() {
  console.log('Banner initialised');
};

Banner.prototype.onPolite = function() {
  console.log('Polite loading scripts');
  this.images = [
    'images/logo.png'
  ];
};

Banner.prototype.onVisible = function() {
  var _this = this;

  this.politeLoad([
    '//cdnjs.cloudflare.com/ajax/libs/gsap/1.17.0/TweenLite.min.js',
    '//cdnjs.cloudflare.com/ajax/libs/gsap/1.17.0/TimelineLite.min.js',
    '//cdnjs.cloudflare.com/ajax/libs/gsap/1.17.0/plugins/CSSPlugin.min.js',
    '//cdnjs.cloudflare.com/ajax/libs/gsap/1.17.0/easing/EasePack.min.js'
  ], function() {
    _this.start();
  });
};

Banner.prototype.smartObject = function(_settings) {
  var _this = this;

  var settings = _settings || {};
  settings.type = settings.type || 'div';
  settings.position = settings.position || 'absolute';
  settings.left = settings.left || '0';
  settings.top = settings.top || '0';

  var element = document.createElement(settings.type);
  element._settings = settings.constructor();
  for (var key in settings) element._settings[key] = settings[key];

  if (settings.backgroundImage) {
    element.style.backgroundSize = settings.backgroundSize || '';
    element.style.backgroundPosition = settings.backgroundPosition || '';
    element.style.backgroundRepeat = settings.backgroundRepeat || 'no-repeat';

    if (Object.prototype.toString.call(settings.backgroundImage) === '[object Array]') {
      element.images = settings.backgroundImage;
      for(var i = 0; i < element.images.length; ++i) {
        loadImg(element.images[i], i === 0);
      }
    } else {
      loadImg(settings.backgroundImage, true);
    }
  } else {
    applySettings();
  }

  function applySettings() {
    if (settings.id) element.id = settings.id;
    if (settings.parent) settings.parent.appendChild(element);
    if (settings.innerHTML) element.innerHTML = settings.innerHTML;
    delete settings.innerHTML;
    delete settings.retina;
    delete settings.parent;
    delete settings.id;
    delete settings.type;
    TweenLite.set(element, settings);
  }

  function loadImg(src, setImg) {
    var img = _this.imageCache[src];
    if (img) {
      if (setImg) setImage.apply(img);
    } else {
      img = document.createElement('img');
      img.src = src;
      if (setImg) img.onload = setImage;
      _this.imageCache[src] = img;
    }
  }

  function setImage() {
    var isSVG = this.src.slice(-4) == '.svg';
    if (isSVG) document.body.appendChild(this);
    settings.width = Math.round(settings.width || (settings.retina ? this.width / 2 : this.width));
    settings.height = Math.round(settings.height || (settings.retina ? this.height / 2 : this.height));
    settings.backgroundImage = 'url(' + this.src + ')';
    applySettings();
    if (isSVG) document.body.removeChild(this);
  }

  // Helper functions
  element.appendChildren = function(children) { for(var i = 0; i < children.length; ++i) this.appendChild(children[i]); };
  element.set = function(settings) { TweenLite.set(this, settings); };
  element.to = function(time, settings) { TweenLite.to(this, time, settings); };
  element.from = function(time, settings) { TweenLite.from(this, time, settings); };
  element.fromTo = function(time, from, to) { TweenLite.fromTo(this, time, from, to); };
  element.get = function(property) { return ((this._gsTransform && this._gsTransform[property]) || (this._gsTransform && this._gsTransform[property] === 0)) ? this._gsTransform[property] : (this.style[property].slice(-2) == 'px') ? parseFloat(this.style[property]) : this.style[property]; };
  element.centerHorizontal = function() { TweenLite.set(this, {left: 0, right: 0, marginLeft: 'auto', marginRight: 'auto'}); };
  element.centerVertical = function() { TweenLite.set(this, {top: 0, bottom: 0, marginTop: 'auto', marginBottom: 'auto'}); };
  element.center = function() { TweenLite.set(this, {top: 0, left: 0, right: 0, bottom: 0, margin: 'auto'}); };
  element.getOriginal = function(property){ return element._settings[property] || 0};

  return element;
};

Banner.prototype.preloadImages = function(images, callback, scope) {
  var _this = this;

  var l = images.length;
  var loaded = 0;
  var img = null;
  for (var i = 0; i < l; ++i) {
    img = document.createElement('img');
    img.src = img.microSrc = images[i];
    img.onload = function() {
      _this.imageCache[this.microSrc] = this;
      loaded++;
      if (loaded == l) {
        if (scope) {
          callback.call(scope);
        } else {
          callback();
        }
      }
    };
  }
};
