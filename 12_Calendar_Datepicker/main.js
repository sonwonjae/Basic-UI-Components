import { objectToDate, dateToObject, formatDate } from './utils/helper.js';

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

// DOM nodes
const $calendar = document.querySelector('.calendar');
const $calendarInput = document.querySelector('.calendar-input');
const $calendarWrapper = document.querySelector('.calendar-wrapper');
const $prev = $calendar.querySelector('.prev');
const $next = $calendar.querySelector('.next');
const $calendarTitle = document.querySelector('.calendar-title');
const $calendarDate = document.querySelector('.date-grid');

/**
 * 달의 마지막 일
 * @type { (year: number, month: number) => number }
 */
const getLastDate = (year, month) =>
  month === 11 ? new Date(year + 1, 0, 0).getDate() : new Date(year, month + 1, 0).getDate();

/**
 * 달의 1일의 요일
 * @type { (year: number, month: number) => number }
 */
const getFirstDay = (year, month) => new Date(year, month, 1).getDay();
const getLastDay = (year, month) =>
  month === 11 ? new Date(year + 1, 0, 0).getDay() : new Date(year, month + 1, 0).getDay();

/**
 * 변경될 달의 date
 * @type { (year: number, month: number, date: number) => Date }
 */
const getMonthDate = ({ year, month, date }) =>
  new Date(year, month, getLastDate(year, month) < date ? getLastDate(year, month) : date);

/**
 * 달의 DatesList
 * @type { (len: number, obj: object, start: number) => Array }
 */
// eslint-disable-next-line no-param-reassign
const makeDates = (length, obj, start) => Array.from({ length }, () => ({ ...obj, date: start++ }));

const getCalendarDates = (year, month) => {
  const prevYear = year - !month;
  const prevMonth = month === 0 ? 11 : month - 1;
  const nextYear = year + !!(month === 11);
  const nextMonth = month === 11 ? 0 : month + 1;
  const prevStartDate = getLastDate(prevYear, prevMonth) - getFirstDay(year, month) + 1;

  const prevDateObj = { year: prevYear, month: prevMonth, current: false };
  const curDateObj = { year, month, current: true };
  const nextDateObj = { year: nextYear, month: nextMonth, current: false };

  return [
    ...makeDates(getFirstDay(year, month), prevDateObj, prevStartDate),
    ...makeDates(getLastDate(year, month), curDateObj, 1),
    ...makeDates(6 - getLastDay(year, month), nextDateObj, 1),
  ];
};

/**
 * render dates
 * @param {{year: string, month: string, date: string}} dateObject
 */
const render = ({ year, month, date }) => {
  $calendarTitle.innerHTML = `
    <span class="month">${monthStr[month]}</span>
    <span class="year">${year}</span>`;

  $calendarDate.innerHTML = getCalendarDates(year, month)
    .map(
      calDate => `
        <button 
          class="
          ${!calDate.current ? 'other-month ' : ''}
          ${month === calDate.month && date === calDate.date ? 'selected' : ''}
          ">
        <time datetime="${formatDate(objectToDate(calDate))}">${calDate.date}</time></button>`,
    )
    .join('');

  $calendarInput.value = formatDate(new Date(year, month, date));
};

/**
 * get parsed date
 * @returns { Array<string> }
 */
const parseDate = () =>
  document.querySelector('button.selected > time').getAttribute('datetime').split('-');

/**
 * filp month & render
 * @param { number } number
 */
const filpMonth = number => {
  const [year, month, date] = parseDate();
  render(dateToObject(getMonthDate({ year, month: +month - 1 + number, date })));
};

// Event Binding
window.addEventListener('DOMContentLoaded', () => {
  render(dateToObject(new Date()));
  $calendarInput.value = '';
});

document.body.onclick = e => {
  if (e.target.closest('.calendar')) return;
  $calendarWrapper.classList.toggle('hidden', true);
};

$calendarInput.onclick = () => $calendarWrapper.classList.toggle('hidden');

$prev.onclick = () => filpMonth(-1);
$next.onclick = () => filpMonth(+1);

$calendarDate.onclick = e => {
  if (!e.target.matches('time')) return;
  const [year, month, date] = e.target.getAttribute('datetime').split('-');

  render({ year: +year, month: +month - 1, date: +date });
  $calendarWrapper.classList.toggle('hidden');
};
