export default function () {
  const getUriParams = () => {
    let queryString = {};
    const query = window.location.search.substring(1);
    const parmsArray = query.split('&');
    if (parmsArray.length <= 0) return queryString;
    for (let i = 0; i < parmsArray.length; i++) {
      const pair = parmsArray[i].split('=');
      const val = decodeURIComponent(pair[1]);
      if (val !== '"' && pair[0] !== '"') {
        queryString[pair[0]] = val;
      }
    }
    return queryString;
  };
  const clickTag = getUriParams.clicktag;
  this.banner.addEventListener('click', function () {
    window.open(clickTag);
  });
}
