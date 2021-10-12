const $accordion = document.querySelector('.accordion');
const $menuContainers = document.querySelectorAll('.menu-container');

const toggleActive = $subMenu => {
  const $target = $subMenu.parentNode;
  $menuContainers.forEach($container => {
    $container.classList.toggle('active', $target === $container);
    $container.lastElementChild.style.height =
      $target === $container ? `${$subMenu.scrollHeight}px` : '0';
  });
};

$accordion.onclick = e => {
  if (!e.target.classList.contains('menu')) return;
  toggleActive(e.target.nextElementSibling);
};
