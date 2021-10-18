/**
 * @returns {object} navigation methods
 */
const navigation = (() => {
  // DOM nodes
  const $nav = document.querySelector('nav');
  const $main = document.querySelector('main');
  const $toggleArrow = document.querySelector('.toggle');

  /** toggle navigation */
  $toggleArrow.onclick = () => localStorage.setItem('navActive', $nav.classList.toggle('active'));

  return {
    /** init page nav's active status */
    initNavActive() {
      [$nav, $main, $toggleArrow].forEach($el => $el.classList.add('notransition'));
      $nav.classList.toggle('active', JSON.parse(localStorage.getItem('navActive')));
    },
    /** add nav's transition */
    addTranstion() {
      [$nav, $main, $toggleArrow].forEach($el => $el.classList.remove('notransition'));
    },
  };
})();

// Event bindings
window.addEventListener('DOMContentLoaded', navigation.initNavActive);
window.addEventListener('load', navigation.addTranstion);
