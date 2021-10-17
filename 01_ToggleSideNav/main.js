/**
 * @returns {object} navigation methods
 */
const navigation = (() => {
  // DOM nodes
  const $navigation = document.querySelector('nav');
  const $main = document.querySelector('main');
  const $toggleArrow = document.querySelector('.toggle');

  /** toggle navigation */
  $toggleArrow.onclick = () =>
    localStorage.setItem('navActive', $navigation.classList.toggle('active'));

  return {
    /** get initial page nav's status */
    getStatus() {
      [$navigation, $main, $toggleArrow].forEach($el => $el.classList.add('notransition'));
      $navigation.classList.toggle('active', localStorage.getItem('navActive') === 'true');
    },
    /** add nav's transition */
    addTranstion() {
      [$navigation, $main, $toggleArrow].forEach($el => $el.classList.remove('notransition'));
    },
  };
})();

// Event bindings
window.addEventListener('DOMContentLoaded', navigation.getStatus);
window.addEventListener('load', navigation.addTranstion);
