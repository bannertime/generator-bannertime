'use strict';

document.addEventListener('DOMContentLoaded', function() {

  var links = document.querySelectorAll('a');
  var iframe = document.querySelector('iframe');
  var sideBar = document.querySelector('.sidebar');
  var close = document.getElementById('close');
  var toggle = true;

  function toggleSideBar(e) {
    e.preventDefault();
    if (toggle) {
      TweenLite.to(sideBar, 1, {width:0, padding:0, ease:Power1.easeInOut});
      TweenLite.to(close, 1, {left:0, ease:Power1.easeInOut});
      close.innerText = '❯❯';
    } else {
      TweenLite.to(sideBar, 1, {width:200, padding: '0 40px', ease:Power1.easeInOut});
      TweenLite.to(close, 1, {left:280, ease:Power1.easeInOut});
      close.innerText = '❮❮';
    }
    toggle = !toggle;
  }

  close.addEventListener('click', toggleSideBar);

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
