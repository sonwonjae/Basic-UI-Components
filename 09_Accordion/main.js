(() => {
  // DOM Nodes
  const $accordion = document.querySelector('.accordion');
  const $menuContainers = document.querySelectorAll('.menu-container');

  /** @type { (Element) => {} } */
  const toggleActive = $subMenu => {
    $menuContainers.forEach($container => {
      const matched = $subMenu.parentNode === $container;

      $container.classList.toggle('active', matched);
      $container.lastElementChild.style.height = `${matched ? $subMenu.scrollHeight : 0}px`;
    });
  };

  // Event binding
  $accordion.onclick = e => {
    if (!e.target.classList.contains('menu')) return;
    toggleActive(e.target.nextElementSibling);
  };

  window.addEventListener('DOMContentLoaded', () => {
    $menuContainers[0].lastElementChild.style.height = 'auto';
  });
})();
