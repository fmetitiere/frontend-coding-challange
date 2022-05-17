import moment from 'moment';

export const diffInMonths = (date1, date2) => {
  const moment1 = moment(date1);
  const moment2 = moment(date2);
  
  return moment1.diff(moment2, 'months');
}

export const isAFutureDate = (date) => {
  const moment1 = moment(date);
  return moment1.isAfter();
}

export const formatDate = (date) => {
  const moment1 = moment(date);
  return moment1.utc().format('YYYY/DD/MM');
}