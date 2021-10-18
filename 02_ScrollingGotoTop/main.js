// constant
const THROTTLE_THRESHOLD = 200;
/**
 * Scroll to Top component
 * @returns {function}
 */
const scroll2Top = (() => {
  // constant
  const ICON_TRIGGER_HEIGHT = 100;

  // DOM Node
  const $scrollIcon = document.querySelector('.scroll-icon');
  $scrollIcon.onclick = () => window.scroll({ top: 0, behavior: 'smooth' });

  return () => {
    $scrollIcon.style.display =
      (window.scrollY || window.pageYOffset) >= ICON_TRIGGER_HEIGHT ? 'initial' : 'none';
  };
})();

// Event bindings
/** use lodash.throttle */
window.onscroll = _.throttle(scroll2Top, THROTTLE_THRESHOLD);
