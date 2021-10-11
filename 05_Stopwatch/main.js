// states
let measureTime = 0;
let running = false;
const lapCounter = (() => {
  let count = 0;

  return {
    record() {
      return ++count;
    },
    reset() {
      count = 0;
    },
  };
})();

let interval;

// DOM nodes
const [$leftButton, $rightButton] = document.querySelectorAll('.control');
const $display = document.querySelector('.display');
const $laps = document.querySelector('.laps');

const parseTime = time => (time < 10 ? '0' + time : '' + time);

const updateTime = () => {
  measureTime += 1;
  const minutes = parseTime(Math.floor((measureTime / 100 / 60) % 60));
  const seconds = parseTime(Math.floor((measureTime / 100) % 60));
  const milliSec = parseTime(Math.floor(measureTime % 100));

  $display.textContent = `${minutes}:${seconds}:${milliSec}`;
};

const startWatch = () => {
  $rightButton.removeAttribute('disabled');
  interval = setInterval(updateTime, 10);
  $leftButton.textContent = 'Stop';
  $rightButton.textContent = 'Lap';
  running = true;
};

const stopWatch = () => {
  $leftButton.textContent = 'Start';
  $rightButton.textContent = 'Reset';
  clearInterval(interval);
  running = false;
};

const makeLapsDiv = value => {
  const $div = document.createElement('div');
  $div.innerHTML = value;
  return $div;
};

const recordLap = () => {
  $laps.style.display = 'grid';
  const $fragment = new DocumentFragment();
  $fragment.appendChild(makeLapsDiv(lapCounter.record()));
  $fragment.appendChild(makeLapsDiv($display.textContent));
  $laps.appendChild($fragment);
};

const resetWatch = () => {
  measureTime = 0;
  $rightButton.setAttribute('disabled', 'disabled');
  $leftButton.textContent = 'Start';
  $rightButton.textContent = 'Reset';
  $display.textContent = '00:00:00';
  $laps.innerHTML = `<div class="lap-title">Laps</div>
                    <div class="lap-title">Time</div>`;
  $laps.style.display = 'noane';
  lapCounter.reset();
};

// Event bindings
$leftButton.onclick = () => {
  !running ? startWatch() : stopWatch();
};

$rightButton.onclick = () => {
  !running ? resetWatch() : recordLap();
};
