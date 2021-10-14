/**
 * @returns {function} Set clock's hands
 */
const movementTime = (() => {
  const $hour = document.querySelector('.hour');
  const $minute = document.querySelector('.minute');
  const $second = document.querySelector('.second');

  return (now = new Date()) => {
    const [hours, minutes, seconds] = [now.getHours(), now.getMinutes(), now.getSeconds()];

    $second.style.setProperty('--deg', seconds * 6);
    $minute.style.setProperty('--deg', minutes * 6 + (seconds / 60) * 6);
    $hour.style.setProperty('--deg', hours * 30 + (minutes / 60) * 6 + (seconds / 60 / 60) * 6);
  };
})();

// Event binding
window.addEventListener('DOMContentLoaded', () => {
  movementTime(); // call immediatly
  setInterval(movementTime, 1000);
});
