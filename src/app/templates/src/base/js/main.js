'use strict';

function Preview() {
  this.currentFormat = 0;
  this._bindSelectors();
  this._bindEvents();
}

Preview.prototype._bindSelectors = function() {
  this.links = Array.prototype.slice.call(document.querySelectorAll('a'));
  this.iframe = document.querySelector('iframe');
  this.sideBar = document.querySelector('.sidebar');
  this.up = document.querySelector('.up');
  this.down = document.querySelector('.down');
  this.left = document.querySelector('.left');
  this.right = document.querySelector('.right');
};

Preview.prototype._bindEvents = function() {
  this._onKeyDown = this._onKeyDown.bind(this);
  this._onKeyUp = this._onKeyUp.bind(this);
  this._onClick = this._onClick.bind(this);

  document.addEventListener('keydown', this._onKeyDown);
  document.addEventListener('keyup', this._onKeyUp);

  for (var i = 0; i < this.links.length; i++) {
    this.links[i].addEventListener('click', this._onClick);
  }
};

Preview.prototype._nextFormat = function(array) {
  return array[this.currentFormat++];
};

Preview.prototype._prevFormat = function(array) {
  return array[this.currentFormat--];
};

Preview.prototype._onKeyDown = function(e) {
  switch (e.keyCode) {
    // Left arrow
    case 37:
      e.preventDefault();
      this.left.classList.add('active');
      TweenLite.to(this.sideBar, 1, {width: 0, padding: 0, ease: Power1.easeInOut});
    break;
    // Up arrow
    case 38:
      e.preventDefault();
      this.up.classList.add('active');
      this.iframe.src = this._prevFormat(this.links).href;
      initScrubber();
      if (this.currentFormat === -1) {
        this.currentFormat = this.links.length - 1;
      }
    break;
    // Right arrow
    case 39:
      e.preventDefault();
      this.right.classList.add('active');
      TweenLite.to(this.sideBar, 1, {width: 200, padding: '0 40px', ease: Power1.easeInOut});
    break;
    // Down arrow
    case 40:
      e.preventDefault();
      this.down.classList.add('active');
      this.iframe.src = this._nextFormat(this.links).href;
      initScrubber();
      if (this.currentFormat === this.links.length) {
        this.currentFormat = 0;
      }
    break;
  }
};

Preview.prototype._onKeyUp = function(e) {
  e.preventDefault();
  this.up.classList.remove('active');
  this.right.classList.remove('active');
  this.down.classList.remove('active');
  this.left.classList.remove('active');
};

Preview.prototype._onClick = function(e) {
  var _this = this;
  e.preventDefault();
  initScrubber();
  this.iframe.src = e.target.href;
  TweenLite.set('.iframe iframe', {autoAlpha: 0});
  TweenLite.set('.loading', {display: 'block', autoAlpha: 1});
  setTimeout(function() {
    var banner = _this.iframe.contentWindow.document.querySelector('.banner');
    if (banner) {
      TweenLite.set('.loading', {autoAlpha: 0});
      TweenLite.to('.iframe iframe', 1, {autoAlpha: 1});
      TweenLite.set(banner, {top: 0, right: 0, bottom: 0, left: 0, position: 'absolute', margin: 'auto'});
    }
  }, 1000);
};

/**
 * Scrubber class.
 * @module Scrubber
 */
function Scrubber() {
  this._bindSelectors();
  this._bindEvents();
  this._resetScrubber();

  var _this = this;
  setTimeout(function() {
    _this.timeline = _this.iframe.contentWindow.banner.timeline;
    _this._startTimeline();
  }, 3000);
}

Scrubber.prototype._bindSelectors = function() {
  this.controls = document.querySelector('.controls');
  this.scrubberToggle = document.querySelector('.scrubber-toggle');
  this.iframe = document.querySelector('iframe');
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
  TweenLite.set(this.playBar, {width: 0});
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
    TweenLite.to(this.controls, 0.4, {y: -40});
  } else {
    this.isOpen = false;
    TweenLite.to(this.controls, 0.4, {y: 0});
  }
};

Scrubber.prototype._onClick = function() {
  this._pauseTimeline();
};

Scrubber.prototype._startTimeline = function() {
  if (this.timeline.isActive() === true) {
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
  TweenLite.set(this.playBar, {width: this.timeline.totalProgress() * 100 + '%'});
  this.currentTime.innerHTML = this.timeline.time().toFixed(2);
  this.duration.innerHTML = this.timeline.duration().toFixed(2);
};

Scrubber.prototype._positionScrubber = function(e) {
  var leftOffset = this.playBar.getBoundingClientRect().left;
  var pos = ((e.clientX - leftOffset) / this.seekBar.offsetWidth) * 100;
  if (pos <= 100 && pos >= 0) {
    this.timeline.progress(pos / 100);
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
  this.timeline.seek(this.timeline.time());
  document.removeEventListener('mousemove', this._onMouseMove);
};

function initPreview() {
  new Preview();
}

function initScrubber() {
  new Scrubber();
}

document.addEventListener('DOMContentLoaded', function () {
  initPreview();
  initScrubber();
});
