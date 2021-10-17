// function
const errorMessage = (result, text) => (result ? '' : text);

const validate = (target, $input, regexp) => {
  const [$successIcon, $errorIcon] = $input.querySelectorAll('.icon');

  $successIcon.classList.toggle('hidden', !regexp.test(target.value));
  $errorIcon.classList.toggle('hidden', regexp.test(target.value));
};

export { errorMessage, validate };
