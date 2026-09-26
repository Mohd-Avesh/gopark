const mongoose = require("mongoose");
const { data } = require("./initData.js");

main()
  .then(() => {
    console.log("connected to DB");
  })
  .catch((err) => {
    console.log(err);
  });

async function main() {
  await mongoose.connect("mongodb+srv://aveshmohd2624_db_user:Ujmaayan73@gopark.n2petzo.mongodb.net/?appName=goPark");
}

const spotSchema = new mongoose.Schema({
  title: String,
  location: String,
  country: String,
  description: String,
  // slotNumber: String,
  vehicleType: String,
  slotType: String,
  pricePerHour: Number,
  isAvailable: Boolean,
  imageURL: String,
});

// const spotSchema = new mongoose.Schema({
//   title: {
//     type: String,
//     required: true,
//     trim: true,
//   },

//   location: {
//     type: String,
//     required: true,
//     trim: true,
//   },

//   detailedLocation: {
//     area: {
//       type: String,
//       required: true,
//       trim: true,
//     },
//     landmark: {
//       type: String,
//       trim: true,
//     },
//     address: {
//       type: String,
//       required: true,
//       trim: true,
//     },
//   },

//   country: {
//     type: String,
//     default: "India",
//   },

//   description: {
//     type: String,
//     trim: true,
//   },

//   // 🚗 Allowed vehicle
//   vehicleType: {
//     type: String,
//     required: true,
//     enum: ["car", "bike", "suv"],
//   },

//   // 🅿️ Type of parking slot
//   slotType: {
//     type: String,
//     required: true,
//     enum: ["open", "covered", "basement", "multi-level", "outdoor"],
//   },

//   pricePerHour: {
//     type: Number,
//     required: true,
//     min: 0,
//   },

//   isAvailable: {
//     type: Boolean,
//     default: true,
//   },

//   imageURL: {
//     type: String,
//     required: true,
//   },
// });



const Spot = new mongoose.model("Spot", spotSchema);

async function getSpots() {
  const spots = await Spot.deleteMany();
  await Spot.insertMany(data);
}
getSpots();
