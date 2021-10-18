// helper
/**
 * @param {number} time
 * @returns {string}
 */
const toDigitTime = time => `${time < 10 ? '0' : ''}${time}`;

/**
 * @param {number} time
 * @returns {string}
 */
const parseTime = time => {
  const minutes = toDigitTime(Math.floor(time / 100 / 60) % 60);
  const seconds = toDigitTime(Math.floor(time / 100) % 60);
  const milliSec = toDigitTime(time % 100);
  return `${minutes}:${seconds}:${milliSec}`;
};

/**
 * @return {object} About Stopwatch's methods
 * */
const stopWatch = (() => {
  /** @type {number} */
  let count = 0;

  /** @type {number} */
  let measureTime = 0;

  /** @type {intervalID} */
  let interval;

  /** @type {boolean} */
  let running = false;

  return {
    getStatus() {
      return !running;
    },
    updateTime() {
      measureTime += 1;
      return parseTime(measureTime);
    },
    start(predicate, time) {
      interval = setInterval(predicate, time);
      running = true;
    },
    stop() {
      clearInterval(interval);
      running = false;
    },
    record() {
      return ++count;
    },
    reset() {
      count = 0;
      measureTime = 0;
    },
  };
})();

export default stopWatch;
