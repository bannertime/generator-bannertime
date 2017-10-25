'use strict';

function Preview() {
  this.scrubber = new Scrubber();
  this.menuOpen = false;

  this._bindSelectors();
  this._bindEvents();
  this.iframe.src = window.location.hash.substr(1) || this.iframe.src;
}

Preview.prototype._bindSelectors = function() {
  this.links = Array.prototype.slice.call(document.querySelectorAll('a'));
  this.iframe = document.querySelector('iframe');
  this.sideBar = document.querySelector('.sidebar');
  this.menu = document.querySelector('.menu');
  this.menuList = document.querySelector('.sidebar ul');

  this.pathnames = this.links.map(function (x) {
    return x.getAttribute('href');
  });
};

Preview.prototype._bindEvents = function() {
  this._onClick = this._onClick.bind(this);
  this._onHashChange = this._onHashChange.bind(this);
  this._toggleMenu = this._toggleMenu.bind(this);

  window.addEventListener('hashchange', this._onHashChange);
  this.menu.addEventListener('click', this._toggleMenu);

  for (var i = 0; i < this.links.length; i++) {
    this.links[i].addEventListener('click', this._onClick);
  }
};

Preview.prototype._toggleMenu = function() {
  if (this.menuOpen) {
    this.menuOpen = false;
    this.menu.classList.remove('active');
    this.menuList.classList.remove('active');
  } else {
    this.menuOpen = true;
    this.menu.classList.add('active');
    this.menuList.classList.add('active');
  }
};

Preview.prototype._onHashChange = function() {
  this.iframe.src = window.location.hash.substr(1);
};

Preview.prototype._onClick = function(e) {
  var _this = this;
  var location = '#' + e.target.getAttribute('href');

  e.preventDefault();

  this.scrubber._destroy();
  this.scrubber = new Scrubber();

  window.location.hash = location.replace(/\/+$/, '');

  TweenLite.set('.iframe iframe', { autoAlpha: 0 });
  TweenLite.set('.loading', { display: 'block', autoAlpha: 1 });

  if (this.menuOpen) {
    this._toggleMenu();
  }

  setTimeout(function() {
    var banner = _this.iframe.contentWindow.document.querySelector('.banner');

    if (banner) {
      TweenLite.set('.loading', { autoAlpha: 0 });
      TweenLite.to('.iframe iframe', 1, { autoAlpha: 1 });
    }
  }, 1000);
};

/**
 * Scrubber class.
 * @module Scrubber
 */
function Scrubber() {
  var _this = this;

  this._bindSelectors();
  this._bindEvents();
  this._resetScrubber();

  setTimeout(function() {
    _this.timeline = _this.iframe.contentWindow.banner.timeline;
    _this._startTimeline();
  }, 3000);
}

Scrubber.prototype._bindSelectors = function() {
  this.iframe = document.querySelector('iframe');
  this.scrubber = document.querySelector('.scrubber');
  this.scrubberToggle = document.querySelector('.scrubber-toggle');
  this.playControl = document.querySelector('.play-control');
  this.seekBar = document.querySelector('.seek-bar');
  this.playBar = document.querySelector('.play-bar');
  this.currentTime = document.querySelector('.current-time');
  this.duration = document.querySelector('.duration');
};

Scrubber.prototype._bindEvents = function() {
  this._openScrubber = this._openScrubber.bind(this);
  this._onClick = this._onClick.bind(this);
  this._onMouseDown = this._onMouseDown.bind(this);
  this._onMouseMove = this._onMouseMove.bind(this);
  this._onMouseUp = this._onMouseUp.bind(this);
  this._scrub = this._scrub.bind(this);
  this._onKeyDown = this._onKeyDown.bind(this);

  this.scrubberToggle.addEventListener('click', this._openScrubber);
  this.playControl.addEventListener('click', this._onClick);
  document.addEventListener('keydown', this._onKeyDown);
};

Scrubber.prototype._resetScrubber = function() {
  this.isPaused = false;
  TweenLite.set(this.playBar, { width: 0 });
  this.playBar.style.width = 0;
  this.currentTime.innerHTML = '00:00';
  this.duration.innerHTML = '00:00';
};

Scrubber.prototype._onKeyDown = function(e) {
  switch (e.keyCode) {
    // T
    case 84:
      e.preventDefault();
      this._openScrubber();
    break;
    // Spacebar
    case 32:
      e.preventDefault();
      this._pauseTimeline();
    break;
  }
};

Scrubber.prototype._openScrubber = function() {
  if (this.isOpen !== true) {
    this.isOpen = true;
    TweenLite.to(this.scrubberToggle, 0.4, { y: 0 });
    TweenLite.to(this.scrubber, 0.4, { y: 0 });
  } else {
    this.isOpen = false;
    TweenLite.to(this.scrubberToggle, 0.4, { y: 46 });
    TweenLite.to(this.scrubber, 0.4, { y: 46 });
  }
};

Scrubber.prototype._onClick = function() {
  this._pauseTimeline();
};

Scrubber.prototype._startTimeline = function() {
  if (this.timeline) {
    this.timeline.seek(0);
    this.timeline.play();
    TweenLite.ticker.addEventListener('tick', this._scrub);
    this.seekBar.addEventListener('mousedown', this._onMouseDown);
  }
};

Scrubber.prototype._pauseTimeline = function() {
  if (this.timeline !== true) {
    if (this.isPaused) {
      this.isPaused = false;
      this.playControl.classList.remove('paused');
      this.timeline.play();
    } else {
      this.isPaused = true;
      this.playControl.classList.add('paused');
      this.timeline.pause();
    }
  }
};

Scrubber.prototype._scrub = function() {
  var progress = this.timeline.totalProgress() * 100;

  TweenLite.set(this.playBar, { width: progress + '%' });
  this.currentTime.innerHTML = this.timeline.totalTime().toFixed(2);
  this.duration.innerHTML = this.timeline.totalDuration().toFixed(2);
};

Scrubber.prototype._positionScrubber = function(e) {
  var leftOffset = this.playBar.getBoundingClientRect().left;
  var pos = ((e.clientX - leftOffset) / this.seekBar.offsetWidth) * 100;

  if (pos <= 100 && pos >= 0) {
    this.timeline.totalProgress(pos / 100);
  }
};

Scrubber.prototype._onMouseDown = function(e) {
  this.timeline.pause();
  this._positionScrubber(e);

  document.addEventListener('mouseup', this._onMouseUp);
  document.addEventListener('mousemove', this._onMouseMove);
};

Scrubber.prototype._onMouseMove = function(e) {
  e.preventDefault();

  this._positionScrubber(e);
};

Scrubber.prototype._onMouseUp = function() {
  if (this.playControl.classList.contains('paused')) {
    this.timeline.pause();
  } else {
    this.timeline.play();
  }

  this.timeline.seek(this.timeline.totalTime());
  document.removeEventListener('mousemove', this._onMouseMove);
};

Scrubber.prototype._destroy = function() {
  TweenLite.ticker.removeEventListener('tick', this._scrub);
  this.seekBar.removeEventListener('mousedown', this._onMouseDown);
  document.removeEventListener('mouseup', this._onMouseUp);
  document.removeEventListener('mousemove', this._onMouseMove);
  this.scrubberToggle.removeEventListener('click', this._openScrubber);
  this.playControl.removeEventListener('click', this._onClick);
  document.removeEventListener('keydown', this._onKeyDown);

  this.scrubber = null;
  this.timeline = null;
};

document.addEventListener('DOMContentLoaded', function () {
  new Preview();
});
