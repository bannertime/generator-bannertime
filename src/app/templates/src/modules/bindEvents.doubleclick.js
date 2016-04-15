export default function () {
  this.banner.addEventListener('click', () => {
    Enabler.exit('clickthrough');
  });
}
