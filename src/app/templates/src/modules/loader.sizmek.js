export default function () {
  if (EB.isInitialized()) {
    this.onPolite();
  } else {
    EB.addEventListener(EBG.EventName.EB_INITIALIZED, this.onPolite);
  }
  window.addEventListener('load', () => this.onVisible());
}
