// DOM nodes
const $navigation = document.querySelector('nav');
const $toggleArrow = document.querySelector('.toggle');

/**
 * get initial page nav's status
 */
const getNavStatus = () => {
  localStorage.getItem('navActive') === 'true'
    ? $navigation.classList.add('active')
    : $navigation.classList.remove('active');
};

window.addEventListener('DOMContentLoaded', getNavStatus);

$toggleArrow.onclick = () =>
  localStorage.setItem('navActive', $navigation.classList.toggle('active'));
