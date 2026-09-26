function getBookingStatus(b) {
  if (b.bookingStatus === "cancelled") return "cancelled";

  if (b.bookingStatus === "pending") return "pending";

  const now = new Date();

  const start = new Date(b.date);
  const [sh, sm] = b.startTime.split(":");
  start.setHours(sh, sm);

  const end = new Date(b.date);
  const [eh, em] = b.endTime.split(":");
  end.setHours(eh, em);

  if (now < start) return "upcoming";
  if (now >= start && now <= end) return "active";
  return "completed";
}

module.exports = getBookingStatus;