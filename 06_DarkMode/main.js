(() => {
  // DOM Nodes
  const $toggleButton = document.querySelector('.toggle-button');

  // Event binding
  $toggleButton.onclick = () => {
    localStorage.setItem('dark', document.body.classList.toggle('dark'));
  };
})();
