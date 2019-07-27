import moment from 'moment';

// Date format: MM DD, YYYY 00:00:00 PM
export const getTodayDate = () => moment().format('ll LTS');

