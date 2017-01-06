'use strict';

var Banner = function () {
  this.loader();
  this.imageCache = {};
};

Banner.prototype.onInit = function () {
  console.log('Banner initialised');
};

Banner.prototype.onPolite = function () {
  console.log('Polite loading scripts');
};

/**
 * Polite load scripts and trigger the
 */
Banner.prototype.onVisible = function () {
  var _this = this;

  this.politeLoad([
    'https://cdnjs.cloudflare.com/ajax/libs/gsap/1.18.0/TweenLite.min.js',
    'https://cdnjs.cloudflare.com/ajax/libs/gsap/1.18.0/TimelineLite.min.js',
    'https://cdnjs.cloudflare.com/ajax/libs/gsap/1.18.0/plugins/CSSPlugin.min.js',
    'https://cdnjs.cloudflare.com/ajax/libs/gsap/1.18.0/easing/EasePack.min.js'
  ], function () {
    _this.start();
  });
};

/**
 * Set up smart object method.
 */
Banner.prototype.smartObject = function (_settings) {
  var _this = this;

  var settings = _settings || {};
  settings.type = settings.type || 'div';
  settings.position = settings.position || 'absolute';
  settings.left = settings.left || '0';
  settings.top = settings.top || '0';

  var element = document.createElement(settings.type);
  element._settings = settings.constructor();
  for (var key in settings) {
    element._settings[key] = settings[key];
  }

  switch (settings.type) {
    case 'canvas' :
      element.width = settings.width;
      element.height = settings.height;
      break;
    case 'video' :
      if (settings.autoplay) { element.autoplay = settings.autoplay; }
      if (settings.loop) { element.loop = settings.loop; }
      if (settings.controls) { element.controls = settings.controls; }
      if (settings.muted) { element.muted = settings.muted; }
      if (settings.poster) { element.poster = settings.poster; }
      if (settings.preload) { element.preload = settings.preload; }
      break;
    case 'img' :
      element.src = settings.src;
      element.alt = settings.alt;
      break;
  }

  if (settings.sources) {
    var sources = settings.sources;
    var fragment = document.createDocumentFragment();
    for (var i = 0; i < sources.length; i++) {
      var sourceTag = document.createElement('source');
      sourceTag.src = sources[i].url;
      sourceTag.type = sources[i].type;
      fragment.appendChild(sourceTag);
    }
    element.appendChild(fragment);
  }

  function applySettings() {
    if (settings.id) {
      element.id = settings.id;
    }
    if (settings.parent) {
      settings.parent.appendChild(element);
    }
    if (settings.innerHTML) {
      element.innerHTML = settings.innerHTML;
    }
    delete settings.innerHTML;
    delete settings.retina;
    delete settings.parent;
    delete settings.id;
    delete settings.type;
    delete settings.autoplay;
    delete settings.loop;
    delete settings.controls;
    delete settings.muted;
    delete settings.poster;
    delete settings.preload;
    delete settings.sources;
    delete settings.src;
    delete settings.alt;
    TweenLite.set(element, settings);
  }

  function setImage() {
    var isSVG = this.src.slice(-4) === '.svg';
    if (isSVG) {
      document.body.appendChild(this);
    }
    settings.width = Math.round(settings.width || (settings.retina ? this.width / 2 : this.width));
    settings.height = Math.round(settings.height || (settings.retina ? this.height / 2 : this.height));
    settings.backgroundImage = 'url(' + this.src + ')';
    applySettings();
    if (isSVG) {
      document.body.removeChild(this);
    }
  }

  function loadImg(src, setImg) {
    var img = _this.imageCache[src];
    if (img) {
      if (setImg) {
        setImage.apply(img);
      }
    } else {
      img = document.createElement('img');
      img.src = src;
      if (setImg) {
        img.onload = setImage;
      }
      _this.imageCache[src] = img;
    }
  }

  if (settings.backgroundImage) {
    element.style.backgroundSize = settings.backgroundSize || '100% 100%';
    element.style.backgroundPosition = settings.backgroundPosition || 'center';
    element.style.backgroundRepeat = settings.backgroundRepeat || 'no-repeat';

    if (Object.prototype.toString.call(settings.backgroundImage) === '[object Array]') {
      element.images = settings.backgroundImage;
      for (var j = 0; j < element.images.length; ++j) {
        loadImg(element.images[j], j === 0);
      }
    } else {
      loadImg(settings.backgroundImage, true);
    }
  } else {
    applySettings();
  }

  // Helper functions
  element.appendChildren = function (children) {
    var fragment = document.createDocumentFragment();
    for (var i = 0; i < children.length; i++) {
      fragment.appendChild(children[i]);
    }
    this.appendChild(fragment);
  };

  element.set = function (settings) {
    TweenLite.set(this, settings);
  };

  element.to = function (time, settings) {
    TweenLite.to(this, time, settings);
  };

  element.from = function (time, settings) {
    TweenLite.from(this, time, settings);
  };

  element.fromTo = function (time, from, to) {
    TweenLite.fromTo(this, time, from, to);
  };

  element.get = function (property) {
    return ((this._gsTransform && this._gsTransform[property]) || (this._gsTransform && this._gsTransform[property] === 0)) ? this._gsTransform[property] : (this.style[property].slice(-2) === 'px') ? parseFloat(this.style[property]) : this.style[property];
  };

  element.center = function () {
    TweenLite.set(this, { top: '50%', marginTop: -this.offsetHeight / 2, left: '50%', marginLeft: -this.offsetWidth / 2 });
  };

  element.centerHorizontal = function () {
    TweenLite.set(this, { left: '50%', marginLeft: -this.offsetWidth / 2 });
  };

  element.centerVertical = function () {
    TweenLite.set(this, { top: '50%', marginTop: -this.offsetHeight / 2 });
  };

  element.getOriginal = function (property) {
    return element._settings[property] || 0;
  };

  return element;
};

/**
 * Preload images method.
 */
Banner.prototype.preloadImages = function (images, callback, scope) {
  var _this = this;
  var l = images.length;
  var loaded = 0;
  var img = null;

  for (var i = 0; i < l; ++i) {
    img = document.createElement('img');
    img.src = img.microSrc = images[i];
    img.onload = function () {
      _this.imageCache[this.microSrc] = this;
      loaded++;
      if (loaded === l) {
        if (scope) {
          callback.call(scope);
        } else {
          callback();
        }
      }
    };
  }
};
