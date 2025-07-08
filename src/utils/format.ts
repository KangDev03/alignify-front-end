import { DateTime } from 'luxon';

import type { ApiResponseError } from '@/features/common/common.type';

export const parseIsoToDateTime = (isoString: string): DateTime => {
  return DateTime.fromISO(isoString, { setZone: true }).setZone('Asia/Ho_Chi_Minh');
};

export const formatDate = (date: string | DateTime | Date): string => {
  const dt =
    date instanceof DateTime
      ? date.setZone('Asia/Ho_Chi_Minh')
      : typeof date === 'string'
        ? parseIsoToDateTime(date)
        : DateTime.fromJSDate(date).setZone('Asia/Ho_Chi_Minh');
  return dt.toFormat('dd/MM/yyyy');
};

export const formatTime = (date: string | DateTime | Date): string => {
  const dt =
    date instanceof DateTime
      ? date.setZone('Asia/Ho_Chi_Minh')
      : typeof date === 'string'
        ? parseIsoToDateTime(date)
        : DateTime.fromJSDate(date).setZone('Asia/Ho_Chi_Minh');
  return dt.toFormat('HH:mm');
};

export const formatLastTimeSentMessage = (date: string | DateTime | Date): string => {
  const dt =
    date instanceof DateTime
      ? date.setZone('Asia/Ho_Chi_Minh')
      : typeof date === 'string'
        ? parseIsoToDateTime(date)
        : DateTime.fromJSDate(date).setZone('Asia/Ho_Chi_Minh');
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

export const formatNumber = (num: number) => {
  if (num >= 1000000) {
    return (Math.ceil((num / 1000000) * 10) / 10).toFixed(1) + 'M';
  }
  if (num >= 1000) {
    return (Math.ceil((num / 1000) * 10) / 10).toFixed(1) + 'K';
  }
  return num.toString();
};

export const formatCommonLastTime = (date: string | DateTime | Date): string => {
  const dt =
    date instanceof DateTime
      ? date.setZone('Asia/Ho_Chi_Minh')
      : typeof date === 'string'
        ? parseIsoToDateTime(date)
        : DateTime.fromJSDate(date).setZone('Asia/Ho_Chi_Minh');
  const now = DateTime.now().setZone('Asia/Ho_Chi_Minh');
  const diffSeconds = Math.floor(now.diff(dt, 'seconds').seconds);
  const diffMinutes = Math.floor(now.diff(dt, 'minutes').minutes);
  const diffHours = Math.floor(now.diff(dt, 'hours').hours);
  const diffDays = Math.floor(now.diff(dt, 'days').days);

  if (diffSeconds < 60) {
    return `${diffSeconds > 0 ? diffSeconds : 1} giây trước`;
  } else if (diffMinutes < 60) {
    return `${diffMinutes} phút trước`;
  } else if (diffHours < 24) {
    return `${diffHours} giờ trước`;
  } else if (diffDays < 365 && dt.year === DateTime.now().year) {
    return `${dt.toFormat('dd/MM')}`;
  } else {
    return `${dt.toFormat('dd/MM/yyyy')}`;
  }
};

export const isApiResponseError = (err: unknown): err is ApiResponseError => {
  return (
    typeof err === 'object' &&
    err !== null &&
    'status' in err &&
    'data' in err &&
    typeof err.data === 'object' &&
    err.data !== null &&
    'status' in err.data &&
    'error' in err.data &&
    'timestamp' in err.data &&
    'path' in err.data
  );
};
