export default function () {
  this.timeline = new TimelineMax({ repeat: -1 })
    .to(this.logo.element, 2, { autoAlpha: 1, scale: 0.7, delay: 1, ease: Elastic.easeOut })
    .to(this.logo.element, 1, { autoAlpha: 0, scale: 0.4, delay: 1 });
}
