(() => {
  // DOM Nodes
  const $toggleButton = document.querySelector('.toggle-button');

  // Event binding
  window.addEventListener('DOMContentLoaded', () => {
    const manualDark = localStorage.getItem('dark');
    const darkMatcher = window.matchMedia('(prefers-color-scheme: dark)').matches;

    manualDark
      ? document.body.classList.toggle('dark', manualDark === 'true')
      : document.body.classList.toggle('dark', darkMatcher);

    window.ontransitionend = () => {
      document.body.style.visibility = 'visible';
    };
  });

  $toggleButton.onclick = () => {
    localStorage.setItem('dark', document.body.classList.toggle('dark'));
  };
})();
