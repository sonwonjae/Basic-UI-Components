import toaster from './toaster.mjs';

// patterns
const pattern = {
  userid: /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i,
  password: /^[A-Za-z0-9]{6,12}$/,
  username: /.+/,
  'confirm-password': '',
};

// constants
const ERROR_MESSAGE = {
  userid: '이메일 형식에 맞게 입력해주세요',
  password: '영문 또는 숫자를 6~12자 입력하세요.',
  username: '이름을 입력해주세요.',
  confirmPassword: '패스워드가 일치하지 않습니다.',
};

// state
const validateAllsignin = {
  userid: false,
  password: false,
};

const validateAllsignup = {
  userid: false,
  password: false,
  username: false,
  'confirm-password': false,
};

// toast
const TOAST_TYPE = {
  SUCCESS: 'success',
  ERROR: 'error',
  WARNING: 'warning',
};

const createToastAction = (type, title, message) => ({
  type,
  title,
  message,
});

// DOM Nodes
const $signinForm = document.querySelector('.signin');
const $signupForm = document.querySelector('.signup');
const $signinButton = document.querySelector('.signin.button');
const $signupButton = document.querySelector('.signup.button');

$signinForm.querySelectorAll('.input-container');
$signupForm.querySelectorAll('.input-container');

const [$signinUserid, $signinPassword] = $signinForm.querySelectorAll('.input-container');
const [$signupUserid, $signupName, $signupPassword, $signupConfirm] =
  $signupForm.querySelectorAll('.input-container');
const [$signUplink, $signInlink] = document.querySelectorAll('.link > a');

const signin = {
  userid: $signinUserid,
  password: $signinPassword,
};

const signup = {
  userid: $signupUserid,
  username: $signupName,
  password: $signupPassword,
  'confirm-password': $signupConfirm,
};

// function
const errorMessage = (result, text) => (result ? '' : text);

const validate = (event, $target, regexp) => {
  const [$successIcon, $errorIcon] = $target.querySelectorAll('.icon');

  $successIcon.classList.toggle('hidden', !regexp.test(event.target.value));
  $errorIcon.classList.toggle('hidden', regexp.test(event.target.value));
};

const confirmValidsignin = (e, regexp, type) => {
  validateAllsignin[type] = regexp.test(e.target.value);
  $signinButton.toggleAttribute('disabled', !Object.values(validateAllsignin).every(el => el));
};

const confirmValidsignup = (e, regexp, type) => {
  validateAllsignup[type] = regexp.test(e.target.value);
  $signupButton.toggleAttribute('disabled', !Object.values(validateAllsignup).every(el => el));
};

// Event binding
$signinForm.oninput = _.throttle(e => {
  if (!e.target.matches('input')) return;
  const name = e.target.getAttribute('name');

  validate(e, signin[name], pattern[name]);

  const $error = signin[name].querySelector('.error');
  $error.textContent = errorMessage(pattern[name].test(e.target.value), ERROR_MESSAGE[name]);
  confirmValidsignin(e, pattern[name], name);
}, 100);

$signupForm.oninput = _.throttle(e => {
  if (!e.target.matches('input')) return;
  const name = e.target.getAttribute('name');
  if (name === 'password') {
    pattern['confirm-password'] = new RegExp(`^${e.target.value}$`);
  }
  validate(e, signup[name], pattern[name]);

  const $error = signup[name].querySelector('.error');
  $error.textContent = errorMessage(pattern[name].test(e.target.value), ERROR_MESSAGE[name]);
  confirmValidsignup(e, pattern[name], name);
}, 100);

// submit event
$signinForm.onsubmit = e => {
  e.preventDefault();

  console.log('POST', '/signin', {
    userid: $signinUserid.querySelector('input').value,
    password: $signinPassword.querySelector('input').value,
  });

  toaster.add(createToastAction(TOAST_TYPE.SUCCESS, 'Well done!', 'Signin Successfully'));
};

$signupForm.onsubmit = e => {
  e.preventDefault();

  console.log('POST', '/signup', {
    userid: $signupUserid.querySelector('input').value,
    username: $signupName.querySelector('input').value,
    password: $signupPassword.querySelector('input').value,
    'confirm-password': $signupConfirm.querySelector('input').value,
  });

  toaster.add(createToastAction(TOAST_TYPE.SUCCESS, 'Well done!', 'Signup Successfully'));
};

// Set link
[$signUplink, $signInlink].forEach($link => {
  $link.onclick = () => {
    $signinForm.classList.toggle('hidden');
    $signupForm.classList.toggle('hidden');
  };
});
