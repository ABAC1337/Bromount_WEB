const bcrypt = require("bcrypt");
const User = require("../models/userModel");

const loginPage = (req, res) => {
  res.render("login");
};

const registerSubmit = async (req, res) => {
  try {
    // Destructure the required fields from req.body
    const {
      username_register,
      email_register,
      password_register,
      confirm_password,
    } = req.body;

    // Check if all fields are filled
    if (
      !username_register ||
      !email_register ||
      !password_register ||
      !confirm_password
    ) {
      return res.render("login", {
        error: "Please fill in all fields",
        showErrorReg: true,
      });
    }

    // Check if the user already exists
    const checkExistingUser = await User.findOne({
      $or: [{ email: email_register }, { username: username_register }],
    });

    // If user already exists, return an error
    if (checkExistingUser) {
      return res.render("login", {
        error: "User already exists",
        showErrorReg: true,
      });
    }

    // Hash the password
    const saltRounds = 10;
    const isHashed = await bcrypt.hash(password_register, saltRounds);

    // Create new user with hashed password
    const createUser = await User.create({
      username: username_register,
      email: email_register,
      password: isHashed,
    });

    // Redirect to login page
    res.redirect("/login");
  } catch (error) {
    res.render("login", {
      error: "Error registering user",
      showErrorReg: true,
    });
  }
};

const loginSubmit = async (req, res) => {
  // Destructure the required fields from req.body
  const { username_login, password_login } = req.body;

  // Check if all fields are filled
  if (!username_login || !password_login) {
    return res.render("login", {
      error: "Please fill in all fields",
      showErrorLog: true,
    });
  }

  try {
    // Check if the user exists
    const checkUser = await User.findOne({ username: username_login });

    if (!checkUser) {
      return res.render("login", {
        error: "Invalid credentials",
        showErrorLog: true,
      });
    }

    // Compare the provided password with the hashed password
    const isMatch = await bcrypt.compare(password_login, checkUser.password);

    // Redirect to a protected route after login
    if (isMatch) {
      res.redirect("/dashboard"); 
    } else {
      // Invalid credentials
      return res.render("login", {
        error: "Invalid credentials",
        showErrorLog: true,
      });
    }
  } catch (error) {
    res.render("login", {
      error: "Error logging in",
      showErrorLog: true,
    });
  }
};

module.exports = {
  loginPage,
  registerSubmit,
  loginSubmit,
};
