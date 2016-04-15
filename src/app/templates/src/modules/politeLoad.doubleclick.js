export default function (urls, onComplete) {
  // let loaded = 0;
  // const checkProgress = () => {
  //   if (++loaded === urls.length && onComplete) {
  //     onComplete();
  //   }
  // };
  // for (let i = 0; i < urls.length; i++) {
  //   Enabler.loadScript(urls[i], checkProgress);
  // }

  let loaded = 0;
  const checkProgress = () => {
    if (++loaded === urls.length && onComplete) {
      onComplete();
    }
  };
  for (let i = 0; i < urls.length; i++) {
    this.loadScript(urls[i], checkProgress);
  }
}
