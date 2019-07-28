import moment from 'moment';

// Date format: MM DD, YYYY 00:00:00 PM
export const getTodayDate = () => moment().format('ll LTS');

// Date format: same year ? MM DD : MM DD, YYYY
export const formatDate = (toFormat: string) => {
  let formatted;
  const thisYear = moment().year().toString();
  const index = toFormat.indexOf(thisYear);
  if (toFormat.includes(thisYear)) {
    formatted = toFormat.slice(0, index - 2);
  } else {
    formatted = toFormat.slice(0, index + 4);
  }
  return formatted;
};