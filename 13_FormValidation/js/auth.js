// patterns
const pattern = {
  userid: /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i,
  password: /^[A-Za-z0-9]{6,12}$/,
};

// constants
const ERROR_MESSAGE = {
  userid: '이메일 형식에 맞게 입력해주세요',
  password: '영문 또는 숫자를 6~12자 입력하세요.',
  name: '이름을 입력해주세요.',
  confirmPassword: '패스워드가 일치하지 않습니다.',
};

// state
const vaildateAll = {
  userid: false,
  password: false,
};

// DOM Nodes
const $signinForm = document.querySelector('.signin');
const $signupForm = document.querySelector('.signup');
const $sigininButton = document.querySelector('.signin.button');

$signinForm.querySelectorAll('.input-container');
$signupForm.querySelectorAll('.input-container');

const [$signinUserid, $signinPassword] = $signinForm.querySelectorAll('.input-container');

const $signin = {
  userid: $signinUserid,
  password: $signinPassword,
};

// function
const errorMessage = (result, text) => (result ? '' : text);

const validate = (event, $target, regexp) => {
  const [$successIcon, $errorIcon] = $target.querySelectorAll('.icon');

  $successIcon.classList.toggle('hidden', !regexp.test(event.target.value));
  $errorIcon.classList.toggle('hidden', regexp.test(event.target.value));
};

const confirmValid = (e, regexp, type) => {
  vaildateAll[type] = regexp.test(e.target.value);
  $sigininButton.toggleAttribute('disabled', !Object.values(vaildateAll).every(el => el));
};

// Event binding
// 쓰로틀링
$signinForm.oninput = _.throttle(e => {
  if (!e.target.matches('input')) return;
  const id = e.target.getAttribute('id').replace(/signin-/, '');

  validate(e, $signin[id], pattern[id]);

  const $error = $signin[id].querySelector('.error');
  $error.textContent = errorMessage(pattern[id].test(e.target.value), ERROR_MESSAGE[id]);
  confirmValid(e, pattern[id], id);
}, 200);

$signinForm.onsubmit = e => {
  e.preventDefault();
};
