export function getHourAndMinute(dateStr) {
  const date = new Date(dateStr);
  const time = date.toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });
  return time;
}

export function padZero(value) {
  return value < 10 ? `0${value}` : value;
}

export function formatDate(dateStr) {
  const date = new Date(dateStr);
  const year = date.getFullYear();
  const month = padZero(date.getMonth() + 1);
  const day = padZero(date.getDate());
  const hours = padZero(date.getHours());
  const minutes = padZero(date.getMinutes());

  return `${year}-${month}-${day} ${hours}:${minutes}`;
}
