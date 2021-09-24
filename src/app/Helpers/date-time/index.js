/** Converts given Date object into app standard time representation
 * @param {Date | string} date
 */
export function formatTime(date) {
  date = new Date(date);
  const hr = preZero(date.getHours());
  const min = preZero(date.getMinutes());
  if (date.valueOf()) {
    return `${hr}:${min}`;
  } else {
    throw new Error("Invalid date passed to time format method");
  }
}

/** Attaches a leading zero to given digit if it is a single positive digit */
const preZero = (digit) => (digit < 10 ? "0" + digit : digit);
