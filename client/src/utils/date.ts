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

export const checkDiff = (toCheck: string) => {
  const atTheMoment = moment();
  const timeDiff = atTheMoment.diff(toCheck, 'days');
  return timeDiff;
}

// don't pass in published arg if data is published post
export const displayDate = (toFormat: string, published?: boolean) => {
  let formatted;
  const toLocalTime = moment(toFormat).format('lll');
  const diff = checkDiff(toLocalTime);
  if (typeof published !== 'boolean' && published === undefined) return formatDate(toLocalTime);
  if (!published) {
    formatted = moment(toLocalTime).fromNow();
  } else {
    if (diff < 1) {
      formatted = moment(toLocalTime).fromNow();
    } else {
      formatted = formatDate(toLocalTime);
    }
  }
  return formatted;
};