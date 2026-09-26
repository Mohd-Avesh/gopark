const isLoggedIn = (req, res, next) => {
  if (!req.session.user) {
    if (req.originalUrl !== "/auth/login") {
        req.session.redirectUrl = req.originalUrl;
    }  
    req.session.error = "Please login to continue"
    return res.redirect("/auth/login");
  }
  next();
};

module.exports = { isLoggedIn };