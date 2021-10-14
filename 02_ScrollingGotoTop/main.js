/**
 * Scroll to Top component
 * @returns {function}
 */
const scroll2Top = (() => {
  // DOM Node
  const $scrollIcon = document.querySelector('.scroll-icon');
  $scrollIcon.onclick = () => window.scroll({ top: 0, behavior: 'smooth' });

  return () => {
    $scrollIcon.style.display = window.scrollY >= 100 ? 'initial' : 'none';
  };
})();

// Event bindings
/** use lodash.throttle */
window.onscroll = _.throttle(scroll2Top, 200);
