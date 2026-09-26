require("dotenv").config();
const express = require("express");
const app = express();
const path = require("path");
const ejsMate = require("ejs-mate");
const methodOverride = require("method-override");
const bcrypt = require("bcrypt");
const crypto = require("crypto");
const mongoose = require("mongoose");
const Spot = require("./Models/spots.js");
const Booking = require("./Models/bookings.js");
const User = require("./Models/user.js");
const Contact = require("./Models/contact");
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
const session = require("express-session");
const pdf = require("pdfkit");
const sendEmail = require("./utils/sendOTPEmail.js");
const getBookingStatus = require("./utils/bookingStatus.js");
const autoCancelBookings = require("./cron/autoCancelBookings");
const { isLoggedIn } = require("./middleware/authMiddleware");
const { isLoggedOut } = require("./middleware/authloggedOut");
const contact = require("./Models/contact");
const user = require("./Models/user.js");
main().catch((err) => console.log(err));

async function main() {
  await mongoose
    .connect(process.env.MONGO_URL)
    .then(() => {
      console.log("connection established");
    })
    .catch((err) => {
      console.log(err);
    });
}


autoCancelBookings();

// EJS-Mate setup
app.engine("ejs", ejsMate);
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));


app.use(
  session({
    secret: "itsmysecretcode",
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge: 1000 * 60 * 60 * 24, // 1 day
      httpOnly: true,
      secure: false,
    }
  })
);

app.use((req, res, next) => {
  res.locals.user = req.session.user || null;
  next();
});

// Static files
app.use(express.static(path.join(__dirname, "public")));
//to parse the url data
app.use(express.urlencoded({extended: true}));
//to change the request method
app.use(methodOverride("_method"));

app.use((req, res, next) => {
  res.locals.currentPath = req.path;
  next();
});


// home route
app.get("/home", async (req, res) => {
  res.render("home.ejs", {
    title: "Go-Park | Home",
    css: ["home.css"],
    user: req.session.user || null
  });
});

// about route
app.get("/about", async (req, res) => {
  res.render("about.ejs", {
    title: "Go-Park | About",
    css: ["about.css"],
  });
});

//root{page} route


//show(all slots) route
app.get("/parking-slots", async (req, res) => {
  const { search, vehicleType } = req.query;
  const INITIAL_LIMIT = 9;
  
  let query = {};
  
  if (search && search.trim() !== "") {
    const cleanSearch = search.replace(/[.,/#!$%^&*;:{}=\-_`~()]/g, " ");
    const keywords = cleanSearch.trim().split(/\s+/);
    
    query.$and = keywords.map(word => ({
      $or: [
        { location: { $regex: word, $options: "i" } },
        { country: { $regex: word, $options: "i" } },
        { title: { $regex: word, $options: "i" } },
      ]
    }));
  }
  
  if (vehicleType) {
    query.vehicleType = vehicleType;
  }
  
  let mongoQuery = Spot.find(query)
  .select("title imageURL country isAvailable pricePerHour description location");
  
  if (!search && !vehicleType) {
    mongoQuery = mongoQuery.limit(INITIAL_LIMIT);
  }
  
  const slots = await mongoQuery.lean();
  
  slots.forEach(s => {
    if (s.description) {
      s.description = s.description.slice(0, 40) + "…";
    }
  });
  
  res.render("parkingSlots", {
    title: "Go-Park | Parking-Slots",
    css: ["parkingSlots.css"],
    hideSearch: true,
    slots,
    search,
    vehicleType,
    initialCount: slots.length
  });
});


app.get("/parking-slots/load-more", async (req, res) => {
  const limit = 6;
  const skip = parseInt(req.query.skip) || 0;
  
  const slots = await Spot.find()
  .skip(skip)
  .limit(limit)
  .select("title location country description isAvailable pricePerHour imageURL")
  .lean();
  
  res.json(slots);
});


//single parking slot show route
app.get("/parking-slots/:id", async (req, res) => {
  const id = req.params.id;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.redirect("/parking-slots");
  }
  const slot = await Spot.findById({ _id: id })
  .select("title location country description vehicleType slotType imageURL isAvailable pricePerHour")
  .lean();
  if(!slot){
    return res.redirect("/parking-slots");
  }
  res.render("show.ejs", {
    title: "Go-Park | Slot",
    css: ["show.css"],
    slot: slot,
  });
});


//single slot book route
app.get("/parking-slots/:id/book",isLoggedIn, async (req, res) => {
  const id = req.params.id;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.redirect("/parking-slots");
  }
  const slot = await Spot.findById({ _id: id });
  res.render("book.ejs",{
    title: "Go-Park | Book",
    css: ["book.css"],
    slot: slot,
    hideSearch: true
  }
);
});


app.post("/parking-slots/:slotId/checkout",isLoggedIn, async (req, res) => {
  try {
    const { date, startTime, durationHours, vehicleNumber, customerName, customerEmail } = req.body;

    const slot = await Spot.findById(req.params.slotId);
    if (!slot) return res.send("Slot not found");

    const totalPrice = slot.pricePerHour * durationHours;

    // ✅ Calculate endTime
    const [startHour, startMinute] = startTime.split(":").map(Number);
    const [year, month, day] = date.split("-").map(Number);

    const bookingStart = new Date(year, month - 1, day, startHour, startMinute);
    const bookingEnd = new Date(bookingStart);
    bookingEnd.setHours(bookingEnd.getHours() + parseInt(durationHours));

    const endHour = String(bookingEnd.getHours()).padStart(2, "0");
    const endMinute = String(bookingEnd.getMinutes()).padStart(2, "0");
    const endTime = `${endHour}:${endMinute}`;
    const user = req.session.user;
    // ===============================
    // ✅ STEP 1: CREATE BOOKING FIRST
    // ===============================
    const booking = await Booking.create({
      user: user._id,
      spot: slot._id,
      date,
      startTime,
      endTime,
      durationHours,
      vehicleNumber,
      totalPrice,
      customerName: user.name,
      customerEmail: user.email,
      status: "pending"
    });

    // ===============================
    // ✅ STEP 2: CREATE STRIPE SESSION
    // ===============================
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      mode: "payment",
      line_items: [
        {
          price_data: {
            currency: "inr",
            product_data: {
              name: `Parking Slot - ${slot.title}`,
            },
            unit_amount: totalPrice * 100,
          },
          quantity: 1,
        },
      ],
      success_url: `${req.protocol}://${req.get("host")}/payment/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${req.protocol}://${req.get("host")}/payment/cancel?bookingId=${booking._id.toString()}`,
      metadata: {
        bookingId: booking._id.toString()
      }
    });

    res.redirect(session.url);

  } catch (err) {
    console.log(err);
    res.send("Stripe checkout failed");
  }
});


app.get("/payment/success", async (req, res) => {
  try {
    const sessionId = req.query.session_id;

    if (!sessionId) {
      return res.status(400).send("No session ID provided");
    }

    const session = await stripe.checkout.sessions.retrieve(sessionId);

    if (session.payment_status !== "paid") {
      return res.status(400).send("Payment not completed");
    }

    const bookingId = session.metadata.bookingId;

    if (!bookingId) {
      return res.status(400).send("Booking ID missing in metadata");
    }

    // Find existing booking
    const booking = await Booking.findById(bookingId).populate("spot");

    if (!booking) {
      return res.status(404).send("Booking not found");
    }

    //  Prevent duplicate updates
    if (booking.paymentStatus === "paid") {
      return res.render("payments/success", {
        booking,
        css: ["success.css"],
        title: "Go Park | Success",
      });
    }

    //  Update booking
    booking.paymentStatus = "paid";
    booking.bookingStatus = "confirmed";
    booking.stripeSessionId = session.id;
    booking.stripePaymentIntentId = session.payment_intent;

    await booking.save();
    if (booking.customerEmail) {
    const emailSubject = `Go Park Booking Receipt - ${booking._id}`;
    const emailHtml = `
    <h2>Payment Successful!</h2>
    <p>Hi ${booking.customerName || "User"},</p>
    <p>Your booking is confirmed. Here are the details:</p>
    <ul>
      <li><strong>Booking ID:</strong> ${booking._id}</li>
      <li><strong>Parking Spot:</strong> ${booking.spot?.title || "N/A"}</li>
      <li><strong>Location:</strong> ${booking.spot?.location || "N/A"}</li>
      <li><strong>Date:</strong> ${new Date(booking.date).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric"
  }) || "N/A"}</li>
      <li><strong>Timing:</strong> ${booking.startTime || "--:--"} - ${booking.endTime || "--:--"}</li>
      <li><strong>Amount Paid:</strong> ₹${booking.totalPrice || "N/A"}</li>
    </ul>
    <p>Thank you for choosing Go Park!</p>
  `;
    await sendEmail(booking.customerEmail, emailSubject, emailHtml);
    }
    res.render("payments/success", {
      booking,
      css: ["success.css"],
      title: "Go Park | Success",
    });

  } catch (err) {
    console.error("Error in payment success route:", err);
    res.status(500).send("Something went wrong after payment");
  }
});

app.get("/booking/:bookingId/receipt",isLoggedIn, async (req, res) => {
  const bookId = req.params.bookingId;
  if (!mongoose.Types.ObjectId.isValid(bookId)) return res.redirect("/bookings");
  const booking = await Booking.findById(bookId).populate("spot");
  if (!booking){
    req.session.error = "Booking not found"
    return res.redirect("/bookings");
  }
  if(booking.paymentStatus !== "paid"){
    req.session.error = "Unable to get Receipt"
    return res.redirect("/bookings");
  }

  res.render("payments/success", {
    booking,
    css: ["success.css"],
    title: "Go Park | Receipt",
  });
});


app.get("/booking/:id/receipt/download", async (req, res) => {
  const bookId = req.params.id;
  if (!mongoose.Types.ObjectId.isValid(bookId)) return res.redirect("/bookings");
  const booking = await Booking.findById(bookId).populate("spot");
  if (!booking){
    req.session.error = "Booking not found";
    return res.redirect("/bookings");
  }

  // Create PDF
  const doc = new pdf();
  res.setHeader("Content-Disposition", `attachment; filename=receipt_${booking._id}.pdf`);
  res.setHeader("Content-Type", "application/pdf");

  doc.text("Parking Booking Receipt", { align: "center", underline: true });
  doc.moveDown();
  doc.text(`Name: ${booking.customerName}`);
  doc.text(`Email: ${booking.customerEmail}`);
  doc.text(`Location: ${booking.spot?.location}`);
  doc.text(`Date: ${booking.date.toDateString()}`);
  doc.text(`Time: ${booking.startTime} - ${booking.endTime}`);
  doc.text(`Vehicle: ${booking.vehicleNumber}`);
  doc.text(`Total Paid: ₹${booking.totalPrice}`);
  doc.end();

  doc.pipe(res);
});


app.get("/payment/cancel", async (req, res) => {
  try {
    const { bookingId } = req.query;

    if (!bookingId || !mongoose.Types.ObjectId.isValid(bookingId)) {
      console.log("Invalid bookingId:", bookingId);
      return res.redirect("/bookings");
    }

    const booking = await Booking.findById(bookingId);

    if (!booking) {
      console.log("Booking not found for ID:", bookingId);
      return res.redirect("/bookings");
    }

    const spot = await Booking.findById(bookingId).populate('spot');
    res.render("payments/cancel", {
      booking,
      spot: spot.spot,
      title: "Go Park | Payment Cancelled",
      css: ["cancel.css"],
    });

  } catch (err) {
    console.error("Unexpected error in cancel route:", err);
    return res.status(500).send("Something went wrong. Please try again.");
  }
});


// GET Register
app.get("/auth/register",isLoggedOut, (req, res) => {
  const error = req.session.error || null;
  req.session.error = null;
  res.render("auth/register", {
    title: "Go Park | Register",
    css: ["auth.css"],
    error,
    hideSearch:true,
  });
});


app.post("/auth/register",isLoggedOut, async (req, res) => {
  try {
    const { name, email, password, phone } = req.body;
    
    const existingUser = await User.findOne({
      $or: [{ email }, { phone }],
    });

    if (existingUser) {
      return res.render("auth/register", {
        title: "Go Park | Register",
        error: "Email or Phone already registered",
        css: ["auth.css"],
        hideSearch: true,
        oldInput: {
          name,
          email,
          phone,
        },
      });
    }

    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    const hashedOtp = await bcrypt.hash(otp, 10);

    const user = new User({
      name,
      email,
      phone,
      password,
      isVerified: false,
      otp: hashedOtp,
      otpExpires: Date.now() + 5 * 60 * 1000,
    });

    await sendEmail(
      email,
      "Go-Park Email Verification OTP",
      `
      <h2>Welcome to Go-Park, ${name}</h2>
      <p>Your OTP is:</p>
      <h1>${otp}</h1>
      <p>This OTP will expire in 5 minutes.</p>
      `
    );

    await user.save();

    req.session.verifyUserId = user._id;

    res.redirect("/auth/verify-email");

  } catch (err) {
    console.error(err);
    res.status(500).send("Server Error");
  }
});


app.get("/auth/verify-email", (req, res) => {
  if (!req.session.verifyUserId) {
    return res.redirect("/auth/register");
  }

  res.render("auth/verifyEmail", {
    title: "Go-Park | Verify Email",
    error: null,
    hideSearch:true,
    css:["auth.css"]
  });
});


app.post("/auth/verify-email", async (req, res) => {
  try {
    const { otp } = req.body;

    if (!req.session.verifyUserId) {
      req.session.error = "Your session expired. Please register again.";
      return res.redirect("/auth/register");
    }

    const user = await User.findById(req.session.verifyUserId)
      .select("+otp +otpExpires");

    if (!user) {
      req.session.verifyUserId = null;
      req.session.error = "Your session expired. Please register again.";
      return res.redirect("/auth/register");
    }

    if (!user.otpExpires || user.otpExpires < Date.now()) {
      return res.render("auth/verifyEmail", {
        title: "Go-Park | Verify Email",
        error: "OTP expired. Please register again.",
        css: ["auth.css"],
        hideSearch: true
      });
    }

    const isMatch = await bcrypt.compare(otp.trim(), user.otp);

    if (!otp || !isMatch) {
      return res.render("auth/verifyEmail", {
        title: "Go-Park | Verify Email",
        error: "Invalid OTP",
        css: ["auth.css"],
        hideSearch: true
      });
    }

    user.isVerified = true;
    user.otp = undefined;
    user.otpExpires = undefined;

    await user.save();

    req.session.verifyUserId = null;

    res.redirect("/auth/login");

  } catch (err) {
    console.error(err);
    res.status(500).send("Server Error");
  }
});


app.get("/auth/resend-otp", async (req, res) => {
  try {

    // 1️⃣ Check session
    if (!req.session.verifyUserId) {
      return res.redirect("/auth/register");
    }

    // 2️⃣ Get user with hidden fields
    const user = await User.findById(req.session.verifyUserId)
      .select("+otp +otpExpires +otpLastSent");

    if (!user) {
      return res.redirect("/auth/register");
    }

    // 3️⃣ If already verified, stop
    if (user.isVerified) {
      return res.redirect("/auth/login");
    }

    // 4️⃣ 30-second cooldown protection
    if (
      user.otpLastSent &&
      Date.now() - user.otpLastSent < 30 * 1000
    ) {
      return res.render("auth/verifyEmail", {
        title: "Go-Park | Verify Email",
        hideSearch: true,
        error: "Please wait 30 seconds before requesting a new OTP.",
        css: ["auth.css"]
      });
    }

    // 5️⃣ Generate new OTP
    const newOtp = Math.floor(100000 + Math.random() * 900000).toString();
    const hashedOtp = await bcrypt.hash(newOtp, 10);

    user.otp = hashedOtp;
    user.otpExpires = Date.now() + 5 * 60 * 1000; // 5 min
    user.otpLastSent = Date.now();

    await user.save();

    // 6️⃣ Send email
    await sendEmail(
      user.email,
      "Go-Park Email Verification OTP",
      `
      <h2>Welcome to Go-Park, ${user.name}</h2>
      <p>Your OTP is:</p>
      <h1>${newOtp}</h1>
      <p>This OTP will expire in 5 minutes.</p>
      `
    );

    return res.render("auth/verifyEmail", {
      title: "Go-Park | Verify Email",
      hideSearch: true,
      error: null,
      css: ["auth.css"]
    });

  } catch (err) {
    console.error("Resend OTP Error:", err);
    return res.status(500).send("Server Error");
  }
});


app.get("/auth/login", isLoggedOut, (req, res) => {
  const success = req.session.success;
  const error = req.session.error;
  const email = req.session.email;
  
  req.session.success = null;
  req.session.error = null;
  req.session.email = null;
  res.render("auth/login.ejs",
  {
    title: "Go-Park | Login",
    error: error,
    success,
    css: ["auth.css"], 
    hideSearch: true,
    email: email
  })
})


app.post("/auth/login",isLoggedOut, async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email }).select("+password");

    if (!user) {
      req.session.error = "Unregistered email";
      req.session.email = email;
      return res.redirect("/auth/login");
    }
    
    if (!user.isVerified) {
      req.session.error = "Please verify your email first";
      return res.redirect("/auth/login");
    }
    
    const isMatch = await bcrypt.compare(password, user.password);
    
    if (!isMatch) {
      req.session.email = email;
      req.session.error = "Incorrect password";
      return res.redirect("/auth/login");
    }

    //Login Success
    req.session.user = {
      _id: user._id,
      name: user.name,
      email: user.email
    };
    req.session.success = "Login successful";
    const redirectUrl = req.session.redirectUrl || "/home";
    req.session.redirectUrl = null; 

    res.redirect(redirectUrl);
  } catch (err) {
    console.error(err);
    req.session.error = "Something went wrong";
    res.redirect("/auth/login");
  }
});


app.get("/auth/logout", (req, res) => {
  if (req.session) {
    req.session.destroy(err => {
      if (err) {
        req.session.error = "Something went wrong. Try again later!"
        return res.redirect("/dashboard");
      }

      res.clearCookie("connect.sid", { path: "/" });
      return res.redirect("/auth/login");
    });
  } else {
    return res.redirect("/auth/login");
  }
});


// Show forgot page
app.get("/auth/forgot-password", (req, res) => {
  res.render("auth/forgot", {
    error: null,
    success: null,
    title: "Go-Park | Forgot-Password",
    css: ["auth.css"], 
    hideSearch: true, });
});

// Handle form
app.post("/auth/forgot-password", async (req, res) => {
  try {
    const { email } = req.body;

    const user = await User.findOne({ email });

    // Don't reveal if email exists (security)
    if (!user) {
      return res.render("auth/forgot", {
        error: null,
        success: "If this email exists, a reset link has been sent.",
        css: ["auth.css"],
        hideSearch: true,
        title: "Go-Park | Login",
      });
    }

    // Generate token
    const token = crypto.randomBytes(32).toString("hex");

    // Save token in DB
    user.resetToken = token;
    user.resetTokenExpires = Date.now() + 10 * 60 * 1000; // 10 minutes
    await user.save();

    // Reset URL
    const resetURL = `http://localhost:5000/auth/reset-password/${token}`;

    // Send email
    await sendEmail(
      user.email,
      "Password Reset",
      `
      <h3>Password Reset Request</h3>
        <p>Click below to reset your password:</p>
        <a href="${resetURL}">${resetURL}</a>
        <p>This link expires in 10 minutes.</p>
      `
    );

    return res.render("auth/forgot", {
      error: null,
      success: "Reset link sent to your email",
      css: ["auth.css"],
        hideSearch: true,
        title: "Go-Park | Login",
    });

  } catch (err) {
    console.error(err);
    res.render("auth/forgot", {
      error: "Something went wrong",
      success: null,
      css: ["auth.css"],
        hideSearch: true,
        title: "Go-Park | Login",
    });
  }
});

app.get("/auth/reset-password/:token", (req, res) => {
  res.render("auth/resetPassword", {
    hideSearch: true,
    token: req.params.token,
    css: ["auth.css"]
  })
})

app.post("/auth/reset-password/:token", async (req, res) => {
  try {
    const { password } = req.body;
    const token = req.params.token;

    // 1️⃣ Find user with valid token + expiry
    const user = await User.findOne({
      resetToken: token,
    }).select("+password");

    console.log(user.password)
    
    if (!user) {
      return res.render("auth/resetPassword", {
        token,
        error: "Reset link is invalid or expired",
        success: null,
        hideSearch: true,
        css: ["auth.css"]
      });
    }


    // 2️⃣ Server-side validation
    if (!password || password.trim().length < 6) {
      return res.render("auth/resetPassword", {
        token,
        error: "Password must be at least 6 characters",
        success: null,
        hideSearch: true,
        css: ["auth.css"]
      });
    }

    if (user.resetTokenExpires < Date.now()) {
      return res.render("auth/forgot", {
        token,
        error: "Token has expired",
        success: null,
        hideSearch: true,
        css: ["auth.css"]
      });
    }

    //4️⃣ Update password
    user.password = password

    // 5️⃣ Clear reset token (VERY IMPORTANT)
    user.resetToken = undefined;
    user.resetTokenExpires = undefined;

    await user.save();

    // 6️⃣ Redirect to login with success message
    req.session.success = "Password changed successfully";
    res.redirect("/auth/login");

  } catch (err) {
    console.error(err);
    res.render("auth/resetPassword", {
      token: req.params.token,
      error: "Something went wrong. Try again.",
      success: null,
      hideSearch: true,
      css: ["auth.css"]
    });
  }
});


app.get("/dashboard", isLoggedIn, async (req, res) =>{
  const userId = req.session.user._id;
  const bookings = await Booking.find({
      user: userId
    })
    .populate("spot") // to show spot name
    .sort({ createdAt: -1 }) // latest first
    .limit(5);
    bookings.forEach(b => {
  b.formattedDate = new Date(b.date).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric"
  });
});
  res.render("dashboard",{
    css:["dashboard.css"],
    bookings: bookings,
  })
})

app.get("/bookings", isLoggedIn, async (req, res) => {
  const error = req.session.error;
  const success = req.session.success;
  req.session.error = null;
  req.session.success = null;
  const userId = req.session.user._id;
  
  const bookings = await Booking.find({ user: userId })
    .populate("spot").sort({ createdAt: -1 });

    const updatedBookings = bookings.map(b => {
  const obj = b.toObject();

  const d = new Date(obj.date || obj.createdAt);

  obj.formattedDate = isNaN(d)
    ? "Invalid Date"
    : d.toLocaleDateString("en-IN", {
        day: "numeric",
        month: "short",
        year: "numeric"
      });

  obj.displayStatus = getBookingStatus(obj);

  return obj;
});

  res.render("bookings", { bookings: updatedBookings, css:["bookings.css"], error, success });
});


app.get("/bookings/:id/pay", isLoggedIn, async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id)
      .populate("spot");

    // Booking not found
    if (!booking) {
      req.session.error = "Booking not found";
      return res.redirect("/bookings");
    }

    // Security check (important)
    if (booking.user.toString() !== req.session.user._id) {
      req.session.error = "Unauthorized access";
      return res.redirect("/bookings");
    }

    // Already paid or cancelled
    if (booking.bookingStatus !== "pending") {
      req.session.error = "Booking already processed";
      return res.redirect("/bookings");
    }

    // Create Stripe session
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      mode: "payment",

      line_items: [
        {
          price_data: {
            currency: "inr",
            product_data: {
              name: booking.spot.title,
            },
            unit_amount: booking.totalPrice * 100, // rs. -> paise
          },
          quantity: 1,
        },
      ],

      success_url: `http://localhost:5000/payment/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `http://localhost:5000/payment/cancel?bookingId=${booking._id.toString()}`,
      metadata: {
        bookingId: booking._id.toString()
      }
    });

    // Redirect to Stripe
    res.redirect(session.url);

  } catch (err) {
    console.log(err);
    req.session.error = "Something went wrong";
    res.redirect("/bookings");
  }
});


app.post("/booking/:id/cancel",isLoggedIn, async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id);

    // 1. Check if booking exists
    if (!booking) {
      return res.status(404).send("Booking not found");
    }

    // 2. Prevent cancelling already cancelled booking
    if (booking.bookingStatus === "cancelled") {
      return res.redirect("/bookings");
    }

    if (booking.paymentStatus === "paid") {
  const [startHour, startMinute] = booking.startTime.split(":").map(Number);
  const nowHour = new Date().getHours();
  const nowMinute = new Date().getMinutes();

  // Compare hours first
  if (startHour < nowHour || (startHour === nowHour && startMinute <= nowMinute)) {
    req.session.error = "Cannot cancel after booking start time";
    return res.redirect("/bookings");
  }

  // Optional: 1-hour restriction
  const diffMinutes = (startHour - nowHour) * 60 + (startMinute - nowMinute);
  if (diffMinutes < 60) {
    req.session.error = "Cannot cancel within 1 hour of booking";
    return res.redirect("/bookings");
  }
}

    // 4. Update booking status
    booking.bookingStatus = "cancelled";
    booking.cancelledAt = new Date();

    // 5. Handle payment status
    if (booking.paymentStatus === "paid") {
      booking.paymentStatus = "refunded"; // simulate refund
    }else{
      booking.paymentStatus = "failed"
    }

    await booking.save();

    // 6. Redirect back
    res.redirect("/bookings");

  } catch (err) {
    console.error(err);
    res.status(500).send("Something went wrong");
  }
});

app.get("/contact", isLoggedIn, async (req, res) => {
  const user = await User.findById({_id: req.session.user._id})
  res.render("contact", {
    user,
    success: null,
    error: null,
    css: ["contact.css", "auth.css"]
  });
});


app.post("/contact",isLoggedIn, async (req, res) => {
  try {
    const { message } = req.body;

    const newContact = new Contact({
      user: req.session.user._id,
      message
    });

    await newContact.save();
    const user = await User.findById({_id: req.session.user._id});
    
    res.render("contact", {
      user,
      success: "Message sent successfully!",
      error: null,
      css: ["contact.css"]
    });

  } catch (err) {
    const user = await User.findById({_id: req.session.user._id});
    res.render("contact", {
      user,
      success: null,
      error: "Something went wrong",
      css: ["contact.css", "auth.css"]
    });
  }
});

app.get("/privacy-policy", (req, res) => {
  res.render("privacy.ejs", { 
    title: "Go-Park | Privacy Policy"
  });
});

app.get("/help-center", (req, res) => {
  res.render("helpCenter.ejs", {
    title: "Go-Park | Help Center"
  })
});

app.get("/terms-and-conditions", (req, res) => {
  res.render("terms.ejs", {
    title: "Go-Park | Terms & Conditions"
  })
});

app.get("/profile",isLoggedIn, async (req, res) => {
  const user = await User.findById({_id: req.session.user._id});
  res.render("profile.ejs",{
    user,
    css:["profile.css"],
    title: "Go-Park | My Profile"
  });
})

app.get("/profile/edit",isLoggedIn, async (req, res) => {
  const user = await User.findById(req.session.user._id);
  res.render("edit.ejs", { user, css: ["profile.css"] });
});

// POST edit profile
app.post("/profile/edit",isLoggedIn, async (req, res) => {
  try {
    const { name, phone } = req.body;
    await User.findByIdAndUpdate(req.session.user._id, { name, phone });
    res.redirect("/profile");
  } catch (err) {
    console.error(err);
    res.send("Something went wrong");
  }
});

app.get('/admin/dashboard',isLoggedIn, async (req, res) => {
  // Example data
  const totalUsers = await User.countDocuments();
  const totalBookings = await Booking.countDocuments();
  const user = await User.findById(req.session.user._id);
  res.render('admin', {
    user,
    totalUsers,
    totalBookings,
    css: ["admin.css"],
  });
});

app.get("/", (req, res) => {
  res.redirect("/home");
});

app.use((req, res, next) => {
  res.redirect("/home");
});



// Server start
const PORT = 5000;
app.listen(PORT, () => {
  console.log(`GO-PARK running at http://localhost:${PORT}`);
});
