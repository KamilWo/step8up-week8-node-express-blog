const User = require("../models/user");

// Handle user registration
const register = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    const newUser = await User.create({ username, email, password });

    // Create a session for the new user
    req.session.save(() => {
      req.session.user = {
        id: newUser.id,
        username: newUser.username,
      };
      res.status(201).json({
        message: "User registered successfully!",
        user: req.session.user,
      });
    });
  } catch (err) {
    console.error(err);
    res
      .status(500)
      .json({ message: "Failed to register user.", error: err.message });
  }
};

// Handle user login
const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const userData = await User.findOne({ where: { email } });

    if (!userData) {
      return res.status(400).json({ message: "Incorrect email or password." });
    }

    const validPassword = userData.checkPassword(password);

    if (!validPassword) {
      return res.status(400).json({ message: "Incorrect email or password." });
    }

    // Create a session for the logged-in user
    req.session.save(() => {
      req.session.user = {
        id: userData.id,
        username: userData.username,
      };
      res.json({ message: "You are now logged in!", user: req.session.user });
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Login failed.", error: err.message });
  }
};

// Handle user logout
const logout = (req, res) => {
  if (req.session.user) {
    req.session.destroy((err) => {
      if (err) {
        return res.status(500).json({ message: "Failed to log out." });
      }
      res.status(204).end(); // No Content
    });
  } else {
    res.status(404).end(); // Not found
  }
};

module.exports = { register, login, logout };
