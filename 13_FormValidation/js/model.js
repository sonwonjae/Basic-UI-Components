// @ts-check
/**
 * @typedef {object} pattern
 * @property {RegExp} userid - validation for userid
 * @property {RegExp} password - validation for password
 * @property {RegExp} username - validation for username
 * @property {RegExp} confirm-password - validation for confirm-password
 */

/**
 * @typedef {object} ERROR_MESSAGE
 * @property {string} userid - message for userid
 * @property {string} password - message for password
 * @property {string} username - message for username
 * @property {string} confirm-password - message for confirm-password
 */

/**
 * @typedef {object} validateAllsignin
 * @property {boolean} userid - valid status for userid
 * @property {boolean} password - valid status for password
 */

/**
 * @typedef {object} validateAllsignup
 * @property {boolean} userid - valid status for userid
 * @property {boolean} password - valid status for password
 * @property {boolean} username - valid status for username
 * @property {boolean} confirm-password - valid status for confirm-password
 */

/** @type {pattern} */
const pattern = {
  userid: /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/i,
  password: /^[A-Za-z0-9]{6,12}$/,
  username: /.+/,
  'confirm-password': /^$/,
};

// constants
/** @type {ERROR_MESSAGE} */
const ERROR_MESSAGE = {
  userid: '이메일 형식에 맞게 입력해주세요',
  password: '영문 또는 숫자를 6~12자 입력하세요.',
  username: '이름을 입력해주세요.',
  'confirm-password': '패스워드가 일치하지 않습니다.',
};

// state
/** @type {validateAllsignin} */
const validateAllsignin = {
  userid: false,
  password: false,
};

/** @type {validateAllsignup} */
const validateAllsignup = {
  userid: false,
  password: false,
  username: false,
  'confirm-password': false,
};

export { pattern, ERROR_MESSAGE, validateAllsignin, validateAllsignup };
