import loader from '../../modules/loader.doubleclick';
import loadScript from '../../modules/loadScript.none';
import onInit from '../../modules/onInit';
import onPolite from '../../modules/onPolite';
import onVisible from '../../modules/onVisible';
import politeLoad from '../../modules/politeLoad.doubleclick';
import bindEvents from '../../modules/bindEvents.doubleclick';
import hidePreloader from '../../modules/hidePreloader';
import start from './start';
import createElements from './createElements';
import setup from './setup';
import animate from './animate';

export default class Banner {
  constructor() {
    this.imageCache = {};
    this.loader();
  }
}

Banner.prototype.loader = loader;
Banner.prototype.loadScript = loadScript;
Banner.prototype.onInit = onInit;
Banner.prototype.onPolite = onPolite;
Banner.prototype.onVisible = onVisible;
Banner.prototype.politeLoad = politeLoad;
Banner.prototype.createElements = createElements;
Banner.prototype.bindEvents = bindEvents;
Banner.prototype.hidePreloader = hidePreloader;
Banner.prototype.start = start;
Banner.prototype.setup = setup;
Banner.prototype.animate = animate;

document.addEventListener('DOMContentLoaded', () => {
  window.banner = new Banner();
});
