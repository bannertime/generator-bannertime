class Preview {
  constructor() {
    this.currentFormat = 0;
    this.bindSelectors();
    this.bindEvents();
  }

  bindSelectors() {
    this.links = Array.prototype.slice.call(document.querySelectorAll('a'));
    this.iframe = document.querySelector('iframe');
    this.sideBar = document.querySelector('.sidebar');
    this.up = document.querySelector('.up');
    this.down = document.querySelector('.down');
    this.left = document.querySelector('.left');
    this.right = document.querySelector('.right');
  }

  bindEvents() {
    this.onKeyDown = this.onKeyDown.bind(this);
    this.onKeyUp = this.onKeyUp.bind(this);
    this.onClick = this.onClick.bind(this);

    document.addEventListener('keydown', this.onKeyDown);
    document.addEventListener('keyup', this.onKeyUp);

    for (let i = 0; i < this.links.length; i++) {
      this.links[i].addEventListener('click', this.onClick);
    }
  }

  nextFormat(array) {
    return array[this.currentFormat++];
  }

  prevFormat(array) {
    return array[this.currentFormat--];
  }

  onKeyDown(e) {
    switch (e.keyCode) {
      // Left arrow
      case 37:
        e.preventDefault();
        this.left.classList.add('active');
        TweenMax.to(this.sideBar, 1, { width: 0, padding: 0, ease: Power1.easeInOut });
        break;
      // Up arrow
      case 38:
        e.preventDefault();
        this.up.classList.add('active');
        this.iframe.src = this.prevFormat(this.links).href;
        if (this.currentFormat === -1) {
          this.currentFormat = this.links.length - 1;
        }
        break;
      // Right arrow
      case 39:
        e.preventDefault();
        this.right.classList.add('active');
        TweenMax.to(this.sideBar, 1, { width: 200, padding: '0 40px', ease: Power1.easeInOut });
        break;
      // Down arrow
      case 40:
        e.preventDefault();
        this.down.classList.add('active');
        this.iframe.src = this.nextFormat(this.links).href;
        if (this.currentFormat === this.links.length) {
          this.currentFormat = 0;
        }
        break;
      default :
        break;
    }
  }

  onKeyUp(e) {
    e.preventDefault();
    this.up.classList.remove('active');
    this.right.classList.remove('active');
    this.down.classList.remove('active');
    this.left.classList.remove('active');
  }

  onClick(e) {
    e.preventDefault();
    this.iframe.src = e.target.href;
    TweenMax.set('.iframe iframe', { autoAlpha: 0 });
    TweenMax.set('.loading', { display: 'block', autoAlpha: 1 });
    setTimeout(() => {
      const banner = this.iframe.contentWindow.document.querySelector('.banner');
      if (banner) {
        TweenMax.set('.loading', { autoAlpha: 0 });
        TweenMax.to('.iframe iframe', 1, { autoAlpha: 1 });
        TweenMax.set(banner, { top: 0, right: 0, bottom: 0, left: 0,
          position: 'absolute', margin: 'auto' });
      }
    }, 1000);
  }
}

document.addEventListener('DOMContentLoaded', () => {
  new Preview(); // eslint-disable-line no-new
});
