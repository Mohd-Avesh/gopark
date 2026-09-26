const isLoggedOut = (req, res, next) => {
  if (req.session.user) {
    return res.redirect("/dashboard"); // or /bookings (better)
  }
  next();
};

module.exports = {isLoggedOut};