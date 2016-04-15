export default function () {
  // const onVisible = () => {
  //   this.onVisible();
  // };

  // const pageLoaded = () => {
  //   this.onPolite();

  //   if (Enabler.isVisible()) {
  //     onVisible();
  //   } else {
  //     Enabler.addEventListener(studio.events.StudioEvent.VISIBLE, onVisible);
  //   }
  // };

  // const enablerInitialised = () => {
  //   this.onInit();

  //   if (Enabler.isPageLoaded()) {
  //     pageLoaded();
  //   } else {
  //     Enabler.addEventListener(studio.events.StudioEvent.PAGE_LOADED, pageLoaded);
  //   }
  // };

  // if (Enabler.isInitialized()) {
  //   enablerInitialised();
  // } else {
  //   Enabler.addEventListener(studio.events.StudioEvent.INIT, enablerInitialised);
  // }


  document.addEventListener('DOMContentLoaded', () => this.onPolite());
  window.addEventListener('load', () => this.onVisible());
}
