import { pattern, ERROR_MESSAGE, validateAllsignup } from './model.js';
import { errorMessage, validate } from './helper.js';
import { createToastAction, toaster } from './toaster.mjs';

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

const confirmValidsignup = (target, regexp, type) => {
  validateAllsignup[type] = regexp.test(target.value);
  $signupButton.toggleAttribute('disabled', !Object.values(validateAllsignup).every(el => el));
};

const syncConfirmPassword = () => {
  const confirmInput = signup['confirm-password'].querySelector('input');
  if (confirmInput.value === '') return;
  confirmValidsignup(confirmInput, pattern['confirm-password'], 'confirm-password');
  validate(confirmInput, signup['confirm-password'], pattern['confirm-password']);
};

// Event Handler
const signupInput = e => {
  if (!e.target.matches('input')) return;
  const name = e.target.getAttribute('name');

  if (name === 'password') {
    pattern['confirm-password'] = new RegExp(`^${e.target.value}$`);
    syncConfirmPassword();
  }

  if (pattern[name]) validate(e.target, signup[name], pattern[name]);

  const $error = signup[name].querySelector('.error');
  $error.textContent = errorMessage(pattern[name].test(e.target.value), ERROR_MESSAGE[name]);
  confirmValidsignup(e.target, pattern[name], name);
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
