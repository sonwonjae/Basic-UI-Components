import stopWatch from './stopwatch.js';

// DOM Nodes
const [$mainButton, $subButton] = document.querySelectorAll('.control');
const $display = document.querySelector('.display');
const $laps = document.querySelector('.laps');

// helper
/**
 * make division element
 * @param {any}
 * @return {Element}
 */
const makeDiv = value => {
  const $div = document.createElement('div');
  $div.innerHTML = value;
  return $div;
};

// For cohesion
const render = {
  startWatch() {
    stopWatch.start(() => {
      $display.textContent = stopWatch.updateTime();
    }, 10);

    $subButton.removeAttribute('disabled');
    [$mainButton.textContent, $subButton.textContent] = ['Stop', 'Lap'];
  },
  stopWatch() {
    stopWatch.stop();

    [$mainButton.textContent, $subButton.textContent] = ['Start', 'Reset'];
  },
  recordLap() {
    $laps.style.display = 'grid';
    const $fragment = new DocumentFragment();
    $fragment.appendChild(makeDiv(stopWatch.record()));
    $fragment.appendChild(makeDiv($display.textContent));
    $laps.appendChild($fragment);
  },
  resetWatch() {
    $subButton.toggleAttribute('disabled', true);
    $display.textContent = '00:00:00';
    $laps.innerHTML = `<div class="lap-title">Laps</div>
                      <div class="lap-title">Time</div>`;
    $laps.style.display = 'none';
    stopWatch.reset();
  },
};

const initStopWatch = () => {
  render.resetWatch();
  $mainButton.onclick = () => {
    stopWatch.getStatus() ? render.startWatch() : render.stopWatch();
  };
  $subButton.onclick = () => {
    stopWatch.getStatus() ? render.resetWatch() : render.recordLap();
  };
};

export default initStopWatch;
