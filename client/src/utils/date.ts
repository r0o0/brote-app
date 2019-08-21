import moment from 'moment';

// Date format: ISO 8601 local time
export const getTodayDate = () => moment().local().format();

// Date format: same year ? MM DD : MM DD, YYYY
// MM DD, YYYY 00: 00: 00 PM 
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