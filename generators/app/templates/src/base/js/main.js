document.addEventListener('DOMContentLoaded', function(event) {

  var links = document.querySelectorAll('a');
  var iframe = document.querySelector('iframe');

  for (var i = 0; i < links.length; i++) {
    links[i].addEventListener('click', handleClick);
  };

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

});
