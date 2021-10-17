import { pattern, ERROR_MESSAGE, validateAllsignin } from './model.js';
import { errorMessage, validate } from './helper.js';
import { createToastAction, toaster } from './toaster.mjs';

// DOM Nodes
const $signinButton = document.querySelector('.signin.button');

const [$signinUserid, $signinPassword] = document.querySelectorAll('.signin > .input-container');

const signin = {
  userid: $signinUserid,
  password: $signinPassword,
};

const confirmValidsignin = (target, regexp, type) => {
  validateAllsignin[type] = regexp.test(target.value);
  $signinButton.toggleAttribute('disabled', !Object.values(validateAllsignin).every(el => el));
};

// Event Handler
const signinInput = e => {
  if (!e.target.matches('input')) return;
  const name = e.target.getAttribute('name');

  validate(e.target, signin[name], pattern[name]);

  const $error = signin[name].querySelector('.error');
  $error.textContent = errorMessage(pattern[name].test(e.target.value), ERROR_MESSAGE[name]);
  confirmValidsignin(e.target, pattern[name], name);
};

// submit event
const signinSubmit = e => {
  e.preventDefault();

  console.log('POST', '/signin', {
    userid: $signinUserid.querySelector('input').value,
    password: $signinPassword.querySelector('input').value,
  });

  toaster.add(createToastAction('success', 'Well done!', 'Signin Successfully'));
};

export { signinInput, signinSubmit };
