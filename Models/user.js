const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
      trim: true,
      minlength: [3, "Name must be at least 3 characters"],
      maxlength: [50, "Name cannot exceed 50 characters"],
    },

    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      lowercase: true,
      trim: true,
      match: [
        /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
        "Please enter a valid email address",
      ],
    },

    password: {
      type: String,
      required: [true, "Password is required"],
      minlength: [6, "Password must be at least 6 characters"],
      maxlength: [128, "Password cannot exceed 128 characters"],
      select: false,
    },

    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user",
    },

    phone: {
      type: String,
      unique: true,
      trim: true,
      match: [/^[6-9]\d{9}$/, "Please enter a valid 10-digit Indian phone number"],
    },

    // bookings: [
    //   {
    //     type: mongoose.Schema.Types.ObjectId,
    //     ref: "Booking",
    //   },
    // ],

    isVerified: {
      type: Boolean,
      default: false,
    },

    isBlocked: {
      type: Boolean,
      default: false,
    },
    otp: {
      type: String,
      select: false
    },
    otpExpires: {
      type: Date,
      select: false
    },
    otpLastSent: {
      type: Date,
      select: false
    },
    resetToken: {
      type: String,
      select: false
    },
    resetTokenExpires: {
      type: Date,
      select: false
    }
  },
  { timestamps: true }
);


// Hash password before saving
userSchema.pre("save", async function () {
  if (!this.isModified("password")) return;

  this.password = await bcrypt.hash(this.password, 10);
});

userSchema.index(
  { otpExpires: 1 },
  {
    expireAfterSeconds: 0,
    partialFilterExpression: { isVerified: false }
  }
);

module.exports = mongoose.model("User", userSchema);