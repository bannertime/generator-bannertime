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

document.addEventListener('DOMContentLoaded', function () {
  new Preview();
});
