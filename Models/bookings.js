const mongoose = require("mongoose");

const bookingSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
  spot: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Spot",
    required: true
  },

  customerName: {
    type: String,
    required: true
  },

  customerEmail: {
    type: String,
    required: true
  },

  date: {
    type: Date,
    required: true
  },

  startTime: {
    type: String,
    required: true
  },

  endTime: {
    type: String,
    required: true
  },

  vehicleNumber: {
    type: String,
    required: true,
    uppercase: true,
    trim: true,
    match: /^[A-Z]{2}[0-9]{2}[A-Z]{1,2}[0-9]{4}$/
  },

  totalPrice: {
    type: Number,
    required: true
  },

  cancelledAt: {
    type: Date
  },

  paymentStatus: {
    type: String,
    enum: ["pending", "paid", "failed", "refunded"],
    default: "pending"
  },

  stripeSessionId: String,
  stripePaymentIntentId: String,

  bookingStatus: {
    type: String,
    enum: ["pending", "confirmed", "cancelled"],
    default: "pending"
  },

}, { timestamps: true });

module.exports = mongoose.model("Booking", bookingSchema);
