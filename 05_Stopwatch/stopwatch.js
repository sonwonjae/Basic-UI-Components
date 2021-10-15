// states
let measureTime = 0;
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

const parseTime = time => (time < 10 ? '0' + time : '' + time);

const updateTime = () => {
  measureTime += 1;
  const minutes = parseTime(Math.floor((measureTime / 100 / 60) % 60));
  const seconds = parseTime(Math.floor((measureTime / 100) % 60));
  const milliSec = parseTime(Math.floor(measureTime % 100));
  return `${minutes}:${seconds}:${milliSec}`;
};

const resetTime = () => {
  measureTime = 0;
  lapCounter.reset();
};

export { lapCounter, updateTime, resetTime };
