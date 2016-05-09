import SmartObject from '../../modules/SmartObject';

export default function () {
  this.logo = new SmartObject({
    backgroundImage: 'images/logo.png',
    retina: true,
    parent: this.banner
  });
}
