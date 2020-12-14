/* Format date in form mm/dd/year */
function formatDate(t) {
  return (
    (t.getMonth() + 1).toString() +
    "/" +
    t.getDate().toString() +
    "/" +
    t.getFullYear().toString().substring(0, 2)
  );
}

/* Format hours in format hour: minute */
function formatHour(t) {
  const mins = t.getMinutes();
  const minutes = mins >= 10 ? mins.toString() : "0" + mins.toString();
  return t.getHours().toString() + ":" + minutes;
}

/* if 1 day or greater, display # days, else display # hours */
export function getTime(t) {
  const timestamp = t.toString().substring(0, 8);
  const date = new Date(parseInt(timestamp, 16) * 1000);
  const difference = Date.now() - date;
  return difference < 86400000 ? formatHour(date) : formatDate(date);
}
