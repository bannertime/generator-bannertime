import Promise from 'bluebird';
import Preloader from '../../modules/Preloader';

export default function () {
  this.banner = document.querySelector('.banner');
  this.bannerWidth = this.banner.offsetWidth;
  this.bannerHeight = this.banner.offsetHeight;

  this.createElements();

  let images = [];
  for (const key in this.imageCache) {
    images.push(this.imageCache[key].src);
  }

  new Promise((resolve, reject) => {
    new Preloader(images, {
      onComplete: (loaded, errors) => {
        setTimeout(() => {
          resolve(loaded, errors);
        }, 10);
      },
      onError: (bombed) => {
        reject(bombed);
      }
    });
  }).then((loaded, errors) => {
    this.setup();
    this.hidePreloader();
    this.animate();
    this.bindEvents();
    if (errors) {
      console.log('the following failed', errors);
    }
  }).catch((bombed) => {
    console.log('error', bombed);
  });
}
