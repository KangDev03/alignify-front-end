import { DateTime } from 'luxon';

export const parseTimestampToDate = (timestamp: number[]): DateTime => {
  const [year, month, day, hour, minute, second, nanos = 0] = timestamp;
  return DateTime.fromObject({
    year,
    month,
    day,
    hour,
    minute,
    second,
    millisecond: Math.floor((nanos || 0) / 1_000_000),
  }).setZone('Asia/Ho_Chi_Minh');
};


export const parseDateString = (date: number[]): string =>{
    const [year, month, day] = date;
    const format = new Date(year, month - 1, day);

    return format.toLocaleDateString('vi-VN');
};

export const formatDateToTimestamp = (date: DateTime | Date): number[] => {
  const dt =
    date instanceof DateTime
      ? date.setZone('Asia/Ho_Chi_Minh')
      : DateTime.fromJSDate(date instanceof Date ? date : new Date(date)).setZone(
          'Asia/Ho_Chi_Minh',
        );
  return [dt.year, dt.month, dt.day, dt.hour, dt.minute, dt.second, dt.millisecond * 1_000_000];
};

export const formatDate = (date: DateTime | string | Date): string => {
  const dt =
    date instanceof DateTime
      ? date.setZone('Asia/Ho_Chi_Minh')
      : DateTime.fromJSDate(date instanceof Date ? date : new Date(date)).setZone(
          'Asia/Ho_Chi_Minh',
        );
  return dt.toFormat('dd/MM/yyyy');
};

export const formatTime = (date: DateTime | string | Date): string => {
  const dt =
    date instanceof DateTime
      ? date.setZone('Asia/Ho_Chi_Minh')
      : DateTime.fromJSDate(date instanceof Date ? date : new Date(date)).setZone(
          'Asia/Ho_Chi_Minh',
        );
  return dt.toFormat('HH:mm');
};

export const formatLastTimeSentMessage = (date: DateTime | string | Date): string => {
  const dt =
    date instanceof DateTime
      ? date.setZone('Asia/Ho_Chi_Minh')
      : DateTime.fromJSDate(date instanceof Date ? date : new Date(date)).setZone(
          'Asia/Ho_Chi_Minh',
        );
  const now = DateTime.now().setZone('Asia/Ho_Chi_Minh');
  const diffSeconds = Math.floor(now.diff(dt, 'seconds').seconds);
  const diffMinutes = Math.floor(now.diff(dt, 'minutes').minutes);
  const diffHours = Math.floor(now.diff(dt, 'hours').hours);
  const diffDays = Math.floor(now.diff(dt, 'days').days);
  const diffWeeks = Math.floor(now.diff(dt, 'weeks').weeks);
  const diffMonths = Math.floor(now.diff(dt, 'months').months);
  const diffYears = Math.floor(now.diff(dt, 'years').years);

  if (diffSeconds < 60) {
    return `${diffSeconds > 0 ? diffSeconds : 1} giây`;
  } else if (diffMinutes < 60) {
    return `${diffMinutes} phút`;
  } else if (diffHours < 24) {
    return `${diffHours} giờ`;
  } else if (diffDays < 7) {
    return `${diffDays} ngày`;
  } else if (diffDays < 30) {
    return `${diffWeeks} tuần`;
  } else if (diffDays < 365) {
    return `${diffMonths} tháng`;
  } else {
    return `${diffYears} năm`;
  }
};
