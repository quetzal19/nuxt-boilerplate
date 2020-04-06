export default (func, wait) => {
  let timeout;
  let dbl;
  let click;
  // eslint-disable-next-line func-names
  return function () {
    const context = this;
    // eslint-disable-next-line no-undef,prefer-rest-params
    const args = arguments;

    dbl = click;
    click = true;

    const reset = () => {
      timeout = null;
      dbl = false;
      click = false;
    };

    clearTimeout(timeout);
    if (dbl) {
      func.apply(context, args);
      reset();
    } else {
      timeout = setTimeout(reset, wait);
    }
  };
};
