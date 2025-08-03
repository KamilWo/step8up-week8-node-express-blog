const isAuthenticated = (req, res, next) => {
  // If the user is not logged in, redirect them to the login page or send an error
  if (!req.session.user) {
    return res.status(401).json({ message: "Unauthorized. Please log in." });
  }
  // If the user is logged in, proceed to the next middleware or route handler
  next();
};

module.exports = { isAuthenticated };
