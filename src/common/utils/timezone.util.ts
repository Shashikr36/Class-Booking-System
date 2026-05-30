import { DateTime } from 'luxon';

export function convertToUTC(
  date: string,
  timezone: string,
): Date {

  return DateTime
    .fromISO(date, { zone: timezone })
    .toUTC()
    .toJSDate();
}

export function convertUTCToTimezone(
  date: Date,
  timezone: string,
): string {

  return DateTime
    .fromJSDate(date)
    .setZone(timezone)
    .toFormat('yyyy-MM-dd hh:mm a');
}