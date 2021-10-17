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

// render
const render = ({ year, month, date }) => {
  $calendarTitle.innerHTML = `
    <span class="month">${monthStr[month]}</span>
    <span class="year">${year}</span>`;

  const prevYear = month === 0 ? year - 1 : year;
  const prevMonth = month === 0 ? 11 : month - 1;

  const nextYear = month === 11 ? year + 1 : year;
  const nextMonth = month === 11 ? 0 : month + 1;

  let prevStartDate = getLastDate(prevYear, prevMonth) - getFirstDay(year, month) + 1;

  const prevDates = Array.from({ length: getFirstDay(year, month) }, () => ({
    year: prevYear,
    month: prevMonth,
    date: prevStartDate++,
    current: false,
  }));

  const currentDates = Array.from({ length: getLastDate(year, month) }, (_, i) => ({
    year,
    month,
    date: i + 1,
    current: true,
  }));

  const nextDates = Array.from({ length: 6 - getLastDay(year, month) }, (_, i) => ({
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

  $calendarInput.value = formatDate(new Date(year, month, date));
};

const init = () => {
  render(dateToObject(new Date()));
};

// Event Binding
window.addEventListener('DOMContentLoaded', init);

document.body.onclick = e => {
  if (e.target.closest('.calendar')) return;
  $calendarWrapper.classList.toggle('hidden', true);
};

$calendarInput.onclick = () => $calendarWrapper.classList.toggle('hidden');

const parseDate = () =>
  document.querySelector('button.selected > time').getAttribute('datetime').split('-');

$prev.onclick = () => {
  const [year, month, date] = parseDate();
  render(dateToObject(getMonthDate({ year, month: +month - 1 - 1, date })));
};

$next.onclick = () => {
  const [year, month, date] = parseDate();
  render(dateToObject(getMonthDate({ year, month: +month - 1 + 1, date })));
};

$calendarDate.onclick = e => {
  // 날짜 클릭 이벤트 위임
  if (!e.target.matches('button') && !e.target.matches('time')) return;
  const datetime = e.target.matches('button')
    ? e.target.firstElementChild.getAttribute('datetime')
    : e.target.getAttribute('datetime');
  const [year, month, date] = datetime.split('-');

  render({ year: +year, month: +month - 1, date: +date });
  $calendarWrapper.classList.toggle('hidden');
};
