const mongoose = require("mongoose");

// const spotSchema = new mongoose.Schema({
//   title: String,
//   location: String,
//   country: String,
//   description: String,
//   // slotNumber: String,
//   vehicleType: String,
//   slotType: String,
//   pricePerHour: Number,
//   isAvailable: Boolean,
//   imageURL: String,
// });

const spotSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, "Title is required"],
    trim: true,
    minlength: [3, "Title must be at least 3 characters"],
    maxlength: [100, "Title cannot exceed 100 characters"]
  },

  location: {
    type: String,
    required: [true, "Location is required"],
    trim: true
  },

  country: {
    type: String,
    required: [true, "Country is required"],
    trim: true
  },

  description: {
    type: String,
    required: [true, "Description is required"],
    minlength: [10, "Description must be at least 10 characters"]
  },

  vehicleType: {
    type: String,
    required: [true, "Vehicle type is required"],
    enum: {
      values: ["Car", "Bike", "SUV"],
      message: "Vehicle type must be Car, Bike or SUV"
    }
  },

  slotType: {
    type: String,
    required: [true, "Slot type is required"],
    enum: {
      values: ["Open", "Covered", "Basement"],
      message: "Slot type must be Open, Covered, or Basement"
    }
  },

  slotCount: {
    type: Number,
    required: true,
    min: 1
  },

  pricePerHour: {
    type: Number,
    required: [true, "Price per hour is required"],
    min: [0, "Price cannot be negative"]
  },

  isAvailable: {
    type: Boolean,
    default: true
  },

  imageURL: {
    type: String,
    required: [true, "Image URL is required"],
    match: [
      /^(https?:\/\/.*\.(?:png|jpg|jpeg|webp))$/,
      "Please provide a valid image URL"
    ]
  }

}, { timestamps: true });


module.exports = mongoose.model("Spot", spotSchema);
