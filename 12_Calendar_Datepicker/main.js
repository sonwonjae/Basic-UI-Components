// Variables
const selectedDate = {
  year: 1993,
  month: 11,
  date: 3,
};

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
const $prev = $calendar.querySelector('.prev');
const $next = $calendar.querySelector('.next');
const $calendarTitle = document.querySelector('.calendar-title');
const $calendardate = document.querySelector('.date-grid');

// Utility
const objectToDate = ({ year, month, date }) => new Date(year, month, date);

const dateToObject = dateObj => ({
  year: dateObj.getFullYear(),
  month: dateObj.getMonth(),
  date: dateObj.getDate(),
});

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
  new Date(
    +objectToDate({ year, month, date }) -
      getLastDateOfMonth(year, month - 1) * 24 * 60 * 60 * 1000,
  );

const getNextMonthDate = ({ year, month, date }) =>
  new Date(
    +objectToDate({ year, month, date }) + getLastDateOfMonth(year, month) * 24 * 60 * 60 * 1000,
  );

console.log('오늘 to obj: ' + dateToObject(new Date()));
console.log('오늘 obj to date: ' + objectToDate(dateToObject(new Date())));
console.log('오늘의 전 달: ' + getPrevMonthDate(dateToObject(new Date())));

// let prevLastDate = prevMonth.getDate() - prevDay + 1;

// render
const render = ({ year, month, date }) => {
  $calendarTitle.innerHTML = `
    <span class="month">${monthStr[month]}</span>
    <span class="year">${year}</span>`;

  // $calendardate.innerHTML
  const lastDate = getLastDateOfMonth(year, month);
  const curFirstDay = getFirstDayOfMonth(year, month);
  const curLastDay = getLastDayOfMonth(year, month);

  const prevMonth = month === 0 ? 11 : month - 1;
  const prevYear = month === 0 ? year - 1 : year;
  const prevlastDate = getLastDateOfMonth(prevYear, prevMonth);
  let prevStartDate = prevlastDate - curFirstDay + 1;

  const prevDates = Array.from({ length: curFirstDay }, () => ({
    year: prevYear,
    month: prevMonth,
    date: prevStartDate++,
    current: false,
  }));

  const currentDates = Array.from({ length: lastDate }, (_, i) => ({
    ...selectedDate,
    date: i + 1,
    current: true,
  }));

  // const nextDates = Array.from({ length: 6 - curLastDay})
  // getNextMonthDate

  // console.log(getNextMonthDate(dateToObject(new Date())));
  // const nextDates = Array.from({length: 6 - new Date(year, month, lastDate).getDay()}, (_, i) => ({

  // }))
  // console.log(currentDates);
};

const init = () => {
  render(dateToObject(new Date()));
};

// Event Binding
window.addEventListener('DOMContentLoaded', init);
$calendarInput.onclick = e => {
  // wrapper 히든 해제
  //
};

$prev.onclick = () => {
  // $calendarTitle 갱신
  // $calendardate 갱신
  // render
};
$next.onclick = () => {
  // $calendarTitle 갱신
  // $calendardate 갱신
  // render
};

$calendardate.onclick = () => {
  // 날짜 클릭 이벤트 위임
};

console.log(getPrevMonthDate(dateToObject(new Date(2021, 7, 31))));
console.log(getPrevMonthDate(dateToObject(new Date(2021, 6, 31))));
console.log(getPrevMonthDate(dateToObject(new Date(2021, 5, 30))));
console.log(getPrevMonthDate(dateToObject(new Date(2021, 4, 31))));
console.log(getPrevMonthDate(dateToObject(new Date(2021, 3, 30))));
console.log(getPrevMonthDate(dateToObject(new Date(2021, 2, 31))));
console.log('');
console.log(getPrevMonthDate(dateToObject(new Date(2021, 9, 14))));
console.log('');
console.log(getPrevMonthDate(dateToObject(new Date(2021, 9, 1))));
console.log(getPrevMonthDate(dateToObject(new Date(2021, 8, 1))));
