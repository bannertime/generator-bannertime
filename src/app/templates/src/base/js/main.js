'use strict';

document.addEventListener('DOMContentLoaded', function() {
  var links = Array.prototype.slice.call(document.querySelectorAll('a'));
  var iframe = document.querySelector('iframe');
  var sideBar = document.querySelector('.sidebar');
  var up = document.querySelector('.up');
  var down = document.querySelector('.down');
  var left = document.querySelector('.left');
  var right = document.querySelector('.right');

  Array.prototype.next = function() {
      return this[this.current++];
  };

  Array.prototype.prev = function() {
      return this[this.current--];
  };

  Array.prototype.current = 0;

  function keyDown(e) {
    console.log(links.current);
    if (e.keyCode === 37) {
      e.preventDefault();
      left.classList.add('active');
      TweenLite.to(sideBar, 1, {width: 0, padding: 0, ease: Power1.easeInOut});
    } else if (e.keyCode === 39) {
      e.preventDefault();
      right.classList.add('active');
      TweenLite.to(sideBar, 1, {width: 200, padding: '0 40px', ease: Power1.easeInOut});
    } else if (e.keyCode === 38) {
      e.preventDefault();
      up.classList.add('active');
      iframe.src = links.prev().href;
      if (links.current === -1) {
        links.current = links.length - 1;
      }
    } else if (e.keyCode === 40) {
      e.preventDefault();
      down.classList.add('active');
      iframe.src = links.next().href;
      if (links.current === links.length) {
        links.current = 0;
      }
    }
  }

  function keyUp(e) {
    e.preventDefault();
    up.classList.remove('active');
    right.classList.remove('active');
    down.classList.remove('active');
    left.classList.remove('active');
  }

  document.addEventListener('keydown', keyDown);
  document.addEventListener('keyup', keyUp);

  function handleClick(e) {
    e.preventDefault();
    iframe.src = this.href;
    TweenLite.set('.iframe iframe', {autoAlpha: 0});
    TweenLite.set('.loading', {display: 'block', autoAlpha: 1});
    setTimeout(function() {
      var banner = iframe.contentWindow.document.querySelector('.banner');
      if (banner) {
        TweenLite.set('.loading', {autoAlpha: 0});
        TweenLite.to('.iframe iframe', 1, {autoAlpha: 1});
        TweenLite.set(banner, {top: 0, right: 0, bottom: 0, left: 0, position: 'absolute', margin: 'auto'});
      }
    }, 1000);
  }

  for (var i = 0; i < links.length; i++) {
    links[i].addEventListener('click', handleClick);
  }
});
