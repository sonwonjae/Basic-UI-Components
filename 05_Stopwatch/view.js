import { lapCounter, updateTime, resetTime } from './stopwatch.js';

// state
let interval;
let running = false;

// DOM Nodes
export const [$leftButton, $rightButton] = document.querySelectorAll('.control');
const $display = document.querySelector('.display');
const $laps = document.querySelector('.laps');

const renderUpdateTime = () => {
  $display.textContent = updateTime();
};

const renderStartWatch = () => {
  $rightButton.removeAttribute('disabled');
  [$leftButton.textContent, $rightButton.textContent] = ['Stop', 'Lap'];
  interval = setInterval(renderUpdateTime, 10);
  running = true;
};

const renderStopWatch = () => {
  [$leftButton.textContent, $rightButton.textContent] = ['Start', 'Reset'];
  clearInterval(interval);
  running = false;
};

const makeLapsDiv = value => {
  const $div = document.createElement('div');
  $div.innerHTML = value;
  return $div;
};

const renderRecordLap = () => {
  $laps.style.display = 'grid';
  const $fragment = new DocumentFragment();
  $fragment.appendChild(makeLapsDiv(lapCounter.record()));
  $fragment.appendChild(makeLapsDiv($display.textContent));
  $laps.appendChild($fragment);
};

const renderResetWatch = () => {
  $rightButton.setAttribute('disabled', 'disabled');
  $leftButton.textContent = 'Start';
  $rightButton.textContent = 'Reset';
  $display.textContent = '00:00:00';
  $laps.innerHTML = `<div class="lap-title">Laps</div>
                    <div class="lap-title">Time</div>`;
  $laps.style.display = 'none';
  resetTime();
};

const eventBingding = () => {
  renderResetWatch();
  $leftButton.onclick = () => {
    !running ? renderStartWatch() : renderStopWatch();
  };
  $rightButton.onclick = () => {
    !running ? renderResetWatch() : renderRecordLap();
  };
};

export { eventBingding };
