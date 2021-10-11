// DOM nodes
const $navigation = document.querySelector('nav');
const $main = document.querySelector('main');
const $toggleArrow = document.querySelector('.toggle');

/**
 * get initial page nav's status
 */
const getNavStatus = () => {
  localStorage.getItem('navActive') === 'true'
    ? [$navigation, $main, $toggleArrow].forEach($el => $el.classList.add('notransition', 'active'))
    : $navigation.classList.remove('active');
};

// Event bindings
window.addEventListener('DOMContentLoaded', getNavStatus);

window.addEventListener('load', () => {
  [$navigation, $main, $toggleArrow].forEach($el => $el.classList.remove('notransition'));
});

$toggleArrow.onclick = () =>
  localStorage.setItem('navActive', $navigation.classList.toggle('active'));
