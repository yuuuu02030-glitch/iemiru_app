export function formatDatetime(value) {
  const date = new Date(value);

  const month = date.getMonth() + 1;
  const day = date.getDate();
  const weekdays = ["日", "月", "火", "水", "木", "金", "土"];
  const weekday = weekdays[date.getDay()];
  const hour = date.getHours();
  const minute = String(date.getMinutes()).padStart(2, "0");

  return `${month}月${day}日（${weekday}）${hour}:${minute}`;
}
