// DOM Nodes
const $toggleButton = document.querySelector('.toggle-button');

// Event binding
$toggleButton.onclick = () => {
  localStorage.setItem('dark', document.body.classList.toggle('dark'));
  console.log(localStorage.getItem('dark'));
};

// window.addEventListener('DOMContentLoaded', () => {
//   document.body.classList.toggle('dark', localStorage.getItem('dark') === 'true');
// });
