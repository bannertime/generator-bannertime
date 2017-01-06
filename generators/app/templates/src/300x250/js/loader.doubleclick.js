'use strict';

/**
 * DoubleClick enabler events.
 */
Banner.prototype.loader = function () {
  var _this = this;

  function onVisible() {
    _this.onVisible();
  }

  function pageLoaded() {
    _this.onPolite();

    if (Enabler.isVisible()) {
      onVisible();
    } else {
      Enabler.addEventListener(studio.events.StudioEvent.VISIBLE, onVisible);
    }
  }

  function enablerInitialised() {
    _this.onInit();

    if (Enabler.isPageLoaded()) {
      pageLoaded();
    } else {
      Enabler.addEventListener(studio.events.StudioEvent.PAGE_LOADED, pageLoaded);
    }
  }

  if (Enabler.isInitialized()) {
    enablerInitialised();
  } else {
    Enabler.addEventListener(studio.events.StudioEvent.INIT, enablerInitialised);
  }
};

/**
 * DoubleClick polite load.
 */
Banner.prototype.politeLoad = function (urls, onComplete) {
  var loaded = 0;
  var checkProgress = function () {
    if (++loaded === urls.length && onComplete) {
      onComplete();
    }
  };
  for (var i = 0; i < urls.length; i++) {
    Enabler.loadScript(urls[i], checkProgress);
  }
};

/**
 * Bind Enabler events.
 */
Banner.prototype.bindEvents = function () {
  this.banner.addEventListener('click', function () {
    Enabler.exit('clickthrough');
  });
};
