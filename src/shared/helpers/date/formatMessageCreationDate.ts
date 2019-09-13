import * as moment from 'moment';

export function formatMessageCreationDate(createdAt: number): string {
  const createdAtDate = moment(createdAt);
  const now = moment();

  if (now.diff(createdAtDate, 'days') > 30) {
    return createdAtDate.format('hh:mm dd MM');
  }

  if (now.diff(createdAtDate, 'days') > 7) {
    return createdAtDate.format('hh:mm dd MMM');
  }

  if (now.diff(createdAtDate, 'days') > 0) {
    return createdAtDate.format('hh:mm EE');
  }

  return createdAtDate.format('hh:mm');
}
