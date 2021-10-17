/**
 * display error message function
 * @param {boolean} testResultRegExp
 * @param {string} message
 * @returns {string}
 */
const errorMessage = (testResultRegExp, message) => (testResultRegExp ? '' : message);

/**
 * toggle validate icon
 * @param {Element} $target
 * @param {Element} $input
 * @param {RegExp} regexp
 */
const toggleValidateIcon = ($target, $input, regexp) => {
  const [$successIcon, $errorIcon] = $input.querySelectorAll('.icon');

  $successIcon.classList.toggle('hidden', !regexp.test($target.value));
  $errorIcon.classList.toggle('hidden', regexp.test($target.value));
};

export { errorMessage, toggleValidateIcon };
