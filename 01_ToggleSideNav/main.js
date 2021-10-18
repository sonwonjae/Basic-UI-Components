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
    /** get initial page nav's status */
    getStatus() {
      [$nav, $main, $toggleArrow].forEach($el => $el.classList.add('notransition'));
      $nav.classList.toggle('active', localStorage.getItem('navActive') === 'true');
    },
    /** add nav's transition */
    addTranstion() {
      [$nav, $main, $toggleArrow].forEach($el => $el.classList.remove('notransition'));
    },
  };
})();

// Event bindings
window.addEventListener('DOMContentLoaded', navigation.getStatus);
window.addEventListener('load', navigation.addTranstion);
