export default function (fn, wait) {
  let timeout = null;
  const timer = wait;

  const debounced = (...args) => {
    const later = () => {
      timeout = null;

      fn(...args);
    };

    clearTimeout(timeout);
    timeout = setTimeout(later, timer);

    if (!timeout) {
      fn(...args);
    }
  };

  debounced.cancel = () => {
    clearTimeout(timeout);
    timeout = null;
  };

  return debounced;
}
