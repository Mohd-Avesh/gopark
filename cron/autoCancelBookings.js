const cron = require("node-cron");
const Booking = require("../Models/bookings");
const { getStartDateTime } = require("../utils/time");

const autoCancelBookings = () => {
  cron.schedule("* * * * *", async () => {
    const now = new Date();

    const bookings = await Booking.find({
      paymentStatus: "pending",
      bookingStatus: { $ne: "cancelled" }
    });

    for (let b of bookings) {
      const createdAt = new Date(b.createdAt);
      const startDateTime = getStartDateTime(b);

      const diffMinutes = (now - createdAt) / (1000 * 60);

      if (diffMinutes > 10 || startDateTime < now) {
        b.bookingStatus = "cancelled";
        b.cancelledAt = new Date();

        await b.save();

        console.log(`Auto cancelled: ${b._id}`);
      }
    }
  });
};

module.exports = autoCancelBookings;