// DOM nodes
const $toggleArrow = document.querySelector('.toggle');

/**
 * @returns {object} navigation methods
 */
const navigation = (() => {
  // private DOM nodes
  const $navigation = document.querySelector('nav');
  const $main = document.querySelector('main');

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
    /** toggle navigation */
    toggle() {
      localStorage.setItem('navActive', $navigation.classList.toggle('active'));
    },
  };
})();

// Event bindings
window.addEventListener('DOMContentLoaded', navigation.getStatus);
window.addEventListener('load', navigation.addTranstion);

$toggleArrow.onclick = navigation.toggle;
