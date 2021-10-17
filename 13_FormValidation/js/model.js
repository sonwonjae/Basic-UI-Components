// patterns
const pattern = {
  userid: /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/i,
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

export { pattern, ERROR_MESSAGE, validateAllsignin, validateAllsignup };
