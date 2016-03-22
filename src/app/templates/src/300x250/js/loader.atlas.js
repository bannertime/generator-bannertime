'use strict';

/**
 * Load events - similar to jQuery window load and dom ready.
 */
Banner.prototype.loader = function () {
  var _this = this;

  function addEvent(elem, event, fn) {
    if (elem.addEventListener) {
      elem.addEventListener(event, fn, false);
    } else {
      elem.attachEvent('on' + event, function () {
        return (fn.call(elem, window.event));
      });
    }
  }
  addEvent(document, 'DOMContentLoaded', function () {
    _this.onPolite();
  });
  addEvent(window, 'load', function () {
    _this.onVisible();

  });
};

/**
 * Polite load scripts.
 */
Banner.prototype.politeLoad = function (urls, onComplete) {
  var loaded = 0;
  var checkProgress = function () {
    if (++loaded === urls.length && onComplete) {
      onComplete();
    }
  };
  for (var i = 0; i < urls.length; i++) {
    this.loadScript(urls[i], checkProgress);
  }
};

/**
 * Load script method.
 */
Banner.prototype.loadScript = function (url, callback) {
  var script = document.createElement('script');
  script.type = 'text/javascript';
  if (script.readyState) {
    script.onreadystatechange = function () {
      if (script.readyState === 'loaded' || script.readyState === 'complete') {
        script.onreadystatechange = null;
        callback();
      }
    };
  } else {
    script.onload = function () {
      callback();
    };
  }
  script.src = url;
  document.getElementsByTagName('head')[0].appendChild(script);
};

