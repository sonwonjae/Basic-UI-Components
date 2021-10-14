(() => {
  // state
  let count = 0;

  // DOM nodes
  const $increase = document.querySelector('.increase');
  const $counter = document.querySelector('.counter');
  const $decrease = document.querySelector('.decrease');

  /** @param { number }: newCount */
  const renderCount = newCount => {
    $counter.textContent = newCount;
  };

  // Event bindings
  $increase.onclick = () => renderCount(++count);
  $decrease.onclick = () => renderCount(count === 0 ? 0 : --count);
})();
