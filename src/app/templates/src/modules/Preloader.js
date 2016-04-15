class Preloader {
  constructor(images, options) {
    this.options = {
      pipeline: false,
      auto: true,
      prefetch: true
    };

    options && typeof options == 'object' && this.setOptions(options);

    this.addQueue(images);
    this.queue.length && this.options.auto && this.processQueue();
  }

  setOptions(options) {
    for (let key in options) {
      options.hasOwnProperty(key) && (this.options[key] = options[key]);
    };
  }

  addQueue(images) {
    this.queue = images.slice();
  }

  reset() {
    this.completed = [];
    this.errors = [];
  }

  addEvents(image, src, index) {
    const self = this;

    const cleanup = function() {
      this.removeEventListener('error', abort);
      this.removeEventListener('abort', abort);
      this.removeEventListener('load', load);
    };

    const abort = function() {
      cleanup.call(this);

      self.errors.push(src);
      self.options.onError && self.options.onError.call(self, src);
      self.checkProgress.call(self, src);
      self.options.pipeline && self.loadNext(index);
    };

    const load = function() {
      cleanup.call(this);

      self.completed.push(src);
      self.checkProgress.call(self, src, this);
      self.options.pipeline && self.loadNext(index);
    };

    image.addEventListener('error', abort, false);
    image.addEventListener('abort', abort, false);
    image.addEventListener('load', load, false);
  }

  load(src, index) {
    const image = new Image;
    this.addEvents(image, src, index);
    image.src = src;
  }

  loadNext(index) {
    index++;
    this.queue[index] && this.load(this.queue[index], index);
  }

  processQueue() {
    this.reset();

    if (!this.options.pipeline) {
      for (let i = 0; i < this.queue.length; ++i) {
        this.load(this.queue[i], i);
      }
    } else {
      this.load(this.queue[0], 0);
    }
  }

  checkProgress(src, image) {
    let args = [];

    this.options.onProgress && src && this.options.onProgress.call(this, src, image, this.completed.length);

    if (this.completed.length + this.errors.length === this.queue.length){
      args.push(this.completed);
      this.errors.length && args.push(this.errors);
      this.options.onComplete.apply(this, args);
    }
  }
}

export default Preloader;
