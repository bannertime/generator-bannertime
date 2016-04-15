import SmartObject from '../../modules/SmartObject';

export default function () {
  this.logo = new SmartObject({
    backgroundImage: 'images/logo.png',
    parent: this.banner
  });
}
