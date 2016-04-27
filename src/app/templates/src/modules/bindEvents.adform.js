export default function () {
  var clickTAGvalue = dhtml.getVar('clickTAG', '//www.adform.com');
  var landingPageTarget = dhtml.getVar('landingPageTarget', '_blank');
  this.banner.addEventListener('click', function () {
    window.open(clickTAGvalue, landingPageTarget);
  });
}
