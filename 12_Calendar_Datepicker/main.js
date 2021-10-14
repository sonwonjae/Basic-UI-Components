// Constants
const monthStr = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];

// Regexp
const DAY_REG_EXP = /^(19|20)\d{2}-(0[1-9]|1[012])-(0[1-9]|[12][0-9]|3[0-1])$/;

// DOM nodes
const $calendar = document.querySelector('.calendar');
const $calendarInput = document.querySelector('.calendar-input');
const $calendarWrapper = document.querySelector('.calendar-wrapper');
const $prev = $calendar.querySelector('.prev');
const $next = $calendar.querySelector('.next');
const $calendarTitle = document.querySelector('.calendar-title');
const $calendarDate = document.querySelector('.date-grid');

// Utility
const objectToDate = ({ year, month, date }) => new Date(year, month, date);

const dateToObject = dateObj => ({
  year: dateObj.getFullYear(),
  month: dateObj.getMonth(),
  date: dateObj.getDate(),
});

const formatDate = (() => {
  const format = n => (n < 10 ? '0' + n : n + '');
  return date => `${date.getFullYear()}-${format(date.getMonth() + 1)}-${format(date.getDate())}`;
})();

/**
 * 달의 마지막 일
 * @type { (year: number, month: number) => number }
 */
const getLastDateOfMonth = (year, month) =>
  month === 11 ? new Date(year + 1, 0, 0).getDate() : new Date(year, month + 1, 0).getDate();

/**
 * 달의 1일의 요일
 * @type { (year: number, month: number) => number }
 */
const getFirstDayOfMonth = (year, month) => new Date(year, month, 1).getDay();
const getLastDayOfMonth = (year, month) =>
  month === 11 ? new Date(year + 1, 0, 0).getDay() : new Date(year, month + 1, 0).getDay();

const getPrevMonthDate = ({ year, month, date }) =>
  getLastDateOfMonth(year, month - 1) < date
    ? new Date(year, month - 1, getLastDateOfMonth(year, month - 1))
    : new Date(year, month - 1, date);

const getNextMonthDate = ({ year, month, date }) =>
  new Date(
    +objectToDate({ year, month, date }) + getLastDateOfMonth(year, month) * 24 * 60 * 60 * 1000,
  );

// render
const render = ({ year, month, date }) => {
  /** @todo: explicit type casting */
  // const [year, month, date] = [+year, +month, +date];
  $calendarTitle.innerHTML = `
    <span class="month">${monthStr[month]}</span>
    <span class="year">${year}</span>`;

  const prevYear = month === 0 ? year - 1 : year;
  const prevMonth = month === 0 ? 11 : month - 1;

  const nextYear = month === 11 ? year + 1 : year;
  const nextMonth = month === 11 ? 0 : month + 1;

  let prevStartDate = getLastDateOfMonth(prevYear, prevMonth) - getFirstDayOfMonth(year, month) + 1;
  const prevDates = Array.from({ length: getFirstDayOfMonth(year, month) }, () => ({
    year: prevYear,
    month: prevMonth,
    date: prevStartDate++,
    current: false,
  }));

  const currentDates = Array.from({ length: getLastDateOfMonth(year, month) }, (_, i) => ({
    year,
    month,
    date: i + 1,
    current: true,
  }));

  const nextDates = Array.from({ length: 6 - getLastDayOfMonth(year, month) }, (_, i) => ({
    year: nextYear,
    month: nextMonth,
    date: i + 1,
    current: false,
  }));

  $calendarDate.innerHTML = [...prevDates, ...currentDates, ...nextDates]
    .map(
      calDate => `
    <button class="${!calDate.current ? 'other-month ' : ''}${
        month === calDate.month && date === calDate.date ? 'selected' : ''
      }"><time datetime="${formatDate(objectToDate(calDate))}">${calDate.date}</time></button>`,
    )
    .join('');
};

const init = () => {
  render(dateToObject(new Date()));
};

// Event Binding
window.addEventListener('DOMContentLoaded', init);

document.body.addEventListener('click', e => {
  if (!e.target.closest('.calendar')) {
    $calendarWrapper.classList.toggle('hidden', true);
  }
});

$calendarInput.onclick = e => {
  $calendarWrapper.classList.toggle('hidden');
};

$calendarInput.onchange = e => {
  e.target.classList.toggle('hidden', true);
  if (!DAY_REG_EXP.test(e.target.value)) return;

  const [year, month, date] = e.target.value.split('-');
  render(dateToObject(new Date(year, month - 1, date)));
};

$prev.onclick = () => {
  /** @todo: refactoring */
  const [year, month, date] = document
    .querySelector('button.selected > time')
    .getAttribute('datetime')
    .split('-');

  render(dateToObject(getPrevMonthDate({ year, month: month - 1, date })));
};

$next.onclick = () => {
  /** @todo: refactoring */
  const [year, month, date] = document
    .querySelector('button.selected > time')
    .getAttribute('datetime')
    .split('-');

  render(dateToObject(getNextMonthDate({ year, month: +month - 1, date })));
};

$calendarDate.onclick = e => {
  // 날짜 클릭 이벤트 위임
  if (!e.target.matches('button') && !e.target.matches('time')) return;
  const datetime = e.target.matches('button')
    ? e.target.firstElementChild.getAttribute('datetime')
    : e.target.getAttribute('datetime');
  const [year, month, date] = datetime.split('-');

  render({ year: +year, month: month - 1, date: +date });
  $calendarInput.value = datetime;
  $calendarWrapper.classList.toggle('hidden');
};
