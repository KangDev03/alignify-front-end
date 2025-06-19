export const parseTimestampToDate = (timestamp: number[]): Date => {
  const [year, month, day, hour, minute, second, nanos] = timestamp;
  return new Date(year, month - 1, day, hour, minute, second, Math.floor(nanos / 1_000_000));
};

export const formatDateToTimestamp = (date: Date): number[] => {
  return [
    date.getFullYear(),
    date.getMonth() + 1,
    date.getDate(),
    date.getHours(),
    date.getMinutes(),
    date.getSeconds(),
    date.getMilliseconds() * 1000000,
  ].map((num) => (num < 10 ? parseInt(`0${num}`) : num));
};

export const formatDate = (date: Date): string => {
  return date.toLocaleString('vi-VN', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  });
};

export const formatTime = (date: Date): string => {
  return date.toLocaleString('vi-VN', {
    hour: '2-digit',
    minute: '2-digit',
    // second: '2-digit',
  });
};

export const formatLastTimeSentMessage = (date: Date): string => {
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffSeconds = Math.floor(diffMs / 1000);
  const diffMinutes = Math.floor(diffSeconds / 60);
  const diffHours = Math.floor(diffMinutes / 60);
  const diffDays = Math.floor(diffHours / 24);
  const diffWeeks = Math.floor(diffDays / 7);
  const diffMonths = Math.floor(diffDays / 30);
  const diffYears = Math.floor(diffDays / 365);

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
