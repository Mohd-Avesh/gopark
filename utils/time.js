function getStartDateTime(booking) {
  const start = new Date(booking.date);

  const [hours, minutes] = booking.startTime.split(":");

  start.setHours(parseInt(hours));
  start.setMinutes(parseInt(minutes));
  start.setSeconds(0);

  return start;
}

module.exports = { getStartDateTime };