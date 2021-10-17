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

export { objectToDate, dateToObject, formatDate };
