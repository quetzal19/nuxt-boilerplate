export default function (source) {
  return new Promise((resolve, reject) => {
    let script = document.createElement('script');
    const prior = document.getElementsByTagName('script')[0];
    script.async = 1;

    script.onreadystatechange = (_, isAbort) => {
      if (isAbort || !script.readyState
        || /loaded|complete/.test(script.readyState)) {
        script.onreadystatechange = null;
        script.onload = null;
        script = undefined;

        if (!isAbort) {
          resolve(script);
        } else {
          reject(isAbort);
        }
      }
    };

    script.onload = script.onreadystatechange;
    script.src = source;
    prior.parentNode.insertBefore(script, prior);
  });
}
