class SmartObject {
  constructor(options) {
    this.options = options;
    this.setDefaultOptions();
    this.createDomNode();
  }

  setDefaultOptions() {
    this.options.type = this.options.type || 'div';
    this.options.position = this.options.position || 'absolute';
    this.options.left = this.options.left || '0';
    this.options.top = this.options.top || '0';
    this.imageCache = window.banner.imageCache || {};

    switch (this.options.type) {
      case 'canvas' :
        this.element.width = this.options.width;
        this.element.height = this.options.height;
        break;
      case 'video' :
        if (this.options.autoplay) this.element.autoplay = this.options.autoplay;
        if (this.options.loop) this.element.loop = this.options.loop;
        if (this.options.controls) this.element.controls = this.options.controls;
        if (this.options.muted) this.element.muted = this.options.muted;
        if (this.options.poster) this.element.poster = this.options.poster;
        if (this.options.preload) this.element.preload = this.options.preload;
        if (this.options.sources) {
          const sources = this.options.sources;
          for (let i = 0; i < sources.length; i++) {
            const sourceTag = document.createElement('source');
            sourceTag.src = sources[i].url;
            sourceTag.type = sources[i].type;
            this.element.appendChild(sourceTag);
          }
        }
        break;
    }
  }

  createDomNode() {
    this.element = document.createElement(this.options.type);
    this.element.options = this.options.constructor();

    for (let key in this.options) {
      if ({}.hasOwnProperty.call(this.options, key)) {
        this.element.options[key] = this.options[key];
      }
    }
    this.setOptions();
  }

  setOptions() {
    if (this.options.backgroundImage) {
      this.element.style.backgroundSize = this.options.backgroundSize || '';
      this.element.style.backgroundPosition = this.options.backgroundPosition || '';
      this.element.style.backgroundRepeat = this.options.backgroundRepeat || 'no-repeat';
      this.loadImg(this.options.backgroundImage, true);
    } else {
      this.applySettings();
    }
  }

  loadImg(src, setImg) {
    let img = this.imageCache[src];
    if (img) {
      if (setImg) {
        this.setImage(img);
      }
    } else {
      img = document.createElement('img');
      img.src = src;
      if (setImg) {
        img.addEventListener('load', () => this.setImage(img));
      }
      this.imageCache[src] = img;
    }
  }

  setImage(img) {
    const isSVG = img.src.slice(-4) === '.svg';
    if (isSVG) {
      document.body.appendChild(img);
    }
    this.options.width = Math.round(this.options.width ||
      (this.options.retina ? img.width / 2 : img.width));
    this.options.height = Math.round(this.options.height ||
      (this.options.retina ? img.height / 2 : img.height));
    this.options.backgroundImage = `url(${img.src})`;
    this.applySettings();
    if (isSVG) {
      document.body.removeChild(img);
    }
  }

  applySettings() {
    if (this.options.id) {
      this.element.id = this.options.id;
    }
    if (this.options.parent) {
      this.options.parent.appendChild(this.element);
    }
    if (this.options.innerHTML) {
      this.element.innerHTML = this.options.innerHTML;
    }
    delete this.options.innerHTML;
    delete this.options.retina;
    delete this.options.parent;
    delete this.options.id;
    delete this.options.type;
    delete this.options.autoplay;
    delete this.options.loop;
    delete this.options.controls;
    delete this.options.muted;
    delete this.options.poster;
    delete this.options.preload;
    delete this.options.sources;
    TweenLite.set(this.element, this.options);
  }

  set(properties) {
    TweenLite.set(this.element, properties);
  }

  center() {
    TweenLite.set(this.element, { top: '50%', marginTop: -this.element.offsetHeight / 2, left: '50%', marginLeft: -this.element.offsetWidth / 2 });
  }

  centerHorizontal() {
    TweenLite.set(this.element, { left: '50%', marginLeft: -this.element.offsetWidth / 2 });
  }

  centerVertical() {
    TweenLite.set(this.element, { top: '50%', marginTop: -this.element.offsetHeight / 2 });
  }

  get(property) {
    ((this.element._gsTransform && this.element._gsTransform[property]) || (this.element._gsTransform && this.element._gsTransform[property] === 0)) ? this.element._gsTransform[property] : (this.element.style[property].slice(-2) === 'px') ? parseFloat(this.element.style[property]) : this.element.style[property];
  }

  getOriginal(property) {
    this.element.options[property] || 0;
  }
}

export default SmartObject;
