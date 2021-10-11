// DOM Nodes
const $scrollIcon = document.querySelector('.scroll-icon');

// throttle
const throttle = (callback, delay) => {
  let timerId;

  return event => {
    if (timerId) return;
    timerId = setTimeout(() => {
      callback(event);
      timerId = null;
    }, delay);
  };
};

// Event bindings
window.addEventListener(
  'scroll',
  throttle(() => {
    $scrollIcon.style.display = window.scrollY >= 100 ? 'initial' : 'none';
  }, 200),
);

$scrollIcon.onclick = () => {
  window.scroll({
    top: 0,
    behavior: 'smooth',
  });
};
