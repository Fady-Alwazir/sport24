import moment from 'moment/moment';

export default (index = 0) => {
  if (index === 1) return moment().add(1, 'days').format('YYYY-MM-DD');
  if (index === 2) return moment().subtract(1, 'days').format('YYYY-MM-DD');
  return moment().format('YYYY-MM-DD');
};
