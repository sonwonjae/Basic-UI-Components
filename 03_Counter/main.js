const Counter = (() => {
  let count = 0;

  return {
    increase() {
      return ++count;
    },
    decrease() {
      return count === 0 ? 0 : --count;
    },
  };
})();

// DOM nodes
const $increase = document.querySelector('.increase');
const $counter = document.querySelector('.counter');
const $decrease = document.querySelector('.decrease');

// Event bindings
$increase.onclick = () => {
  $counter.textContent = Counter.increase();
};

$decrease.onclick = () => {
  $counter.textContent = Counter.decrease();
};
