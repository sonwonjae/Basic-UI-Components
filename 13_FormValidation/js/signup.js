import { pattern, ERROR_MESSAGE, validateAllsignup } from './model.js';
import { errorMessage, toggleValidateIcon } from './helper.js';
import { createToastAction, toaster } from './toaster.js';

// DOM Nodes
const $signupButton = document.querySelector('.signup.button');
const [$signupUserid, $signupName, $signupPassword, $signupConfirm] = document.querySelectorAll(
  '.signup > .input-container',
);
const signup = {
  userid: $signupUserid,
  username: $signupName,
  password: $signupPassword,
  'confirm-password': $signupConfirm,
};

/**
 * confirm validity for button's disable status
 * @param {Element} $target
 * @param {RegExp} regexp
 * @param {string} type
 */
const confirmValidsignup = ($target, regexp, type) => {
  validateAllsignup[type] = regexp.test($target.value);
  $signupButton.toggleAttribute('disabled', !Object.values(validateAllsignup).every(el => el));
};

/**
 * Confirm for showing error status
 * @param {Element} $target
 * @param {string} prop
 */
const checkShowError = ($target, prop) => {
  const $error = signup[prop].querySelector('.error');
  $error.textContent = errorMessage(pattern[prop].test($target.value), ERROR_MESSAGE[prop]);
  confirmValidsignup($target, pattern[prop], prop);
  toggleValidateIcon($target, signup[prop], pattern[prop]);
};

/**
 * Sync at password changed
 */
const syncConfirmPassword = () => {
  const $confirmInput = signup['confirm-password'].querySelector('input');

  if ($confirmInput.value === '') return;
  checkShowError($confirmInput, 'confirm-password');
};

// Event Handler
const signupInput = e => {
  if (!e.target.matches('input')) return;
  const name = e.target.getAttribute('name');

  if (name === 'password') {
    pattern['confirm-password'] = new RegExp(`^${e.target.value}$`);
    syncConfirmPassword();
  }
  checkShowError(e.target, name);
};

// submit
const signupSubmit = e => {
  e.preventDefault();

  console.log('POST', '/signup', {
    userid: $signupUserid.querySelector('input').value,
    username: $signupName.querySelector('input').value,
    password: $signupPassword.querySelector('input').value,
    'confirm-password': $signupConfirm.querySelector('input').value,
  });

  toaster.add(createToastAction('success', 'Well done!', 'Signup Successfully'));
};

export { signupInput, signupSubmit };
