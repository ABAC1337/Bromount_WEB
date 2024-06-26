const bcrypt = require("bcrypt");
const User = require("../../models/userModel");
const jwt = require("jsonwebtoken");

const loginPage = (req, res) => {
  res.render("login");
};

const registerSubmit = async (req, res) => {
  try {
    const { usernameregist, emailregist, passwordregist, confirmpasswordregist } = req.body;

    // Check if all fields are filled
    if (!usernameregist || !emailregist || !passwordregist || !confirmpasswordregist) {
      return res.status(400).render("login", {
        error: "Please fill in all fields",
        showErrorReg: true,
      });
    }

    // Check if the user already exists
    const checkExistingUser = await User.findOne({
      $or: [{ email: emailregist }, { username: usernameregist }],
    });

    if (checkExistingUser) {
      return res.status(400).render("login", {
        error: "User already exists",
        showErrorReg: true,
      });
    }

    // Hash the password
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(passwordregist, saltRounds);

    // Create new user with hashed password
    const newUser = await User.create({
      username: usernameregist,
      email: emailregist,
      password: hashedPassword,
    });

    // Redirect to login page with success message
    res.render("login", {
      success: "User created successfully",
      succeededReg: true,
    });
  } catch (error) {
    console.error("Error registering user:", error);
    res.status(500).render("login", {
      error: "Error registering user",
      showErrorReg: true,
    });
  }
};

const loginSubmit = async (req, res) => {
  const { usernamelogin, passwordlogin } = req.body;

  if (!usernamelogin || !passwordlogin) {
    return res.status(400).render("login", {
      error: "Please fill in all fields",
      showErrorLog: true,
    });
  }

  try {
    const user = await User.findOne({ username: usernamelogin });

    if (!user) {
      return res.status(401).render("login", {
        error: "Invalid credentials",
        showErrorLog: true,
      });
    }

    const isMatch = await bcrypt.compare(passwordlogin, user.password);

    if (!isMatch) {
      return res.status(401).render("login", {
        error: "Invalid credentials",
        showErrorLog: true,
      });
    }

    // Create tokens
    const accessToken = jwt.sign(
      { user_id: user._id, username: user.username },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: "15m" }
    );

    const refreshToken = jwt.sign(
      { user_id: user._id },
      process.env.REFRESH_TOKEN_SECRET,
      { expiresIn: "7d" }
    );

    // Store refreshToken in user document
    user.refresh_token = refreshToken;
    await user.save();

    // Set cookies for tokens
    res.cookie("accessToken", accessToken, {
      httpOnly: true,
      maxAge: 15 * 60 * 1000, // 15 minutes
    });

    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    });

    req.session.username = user.username;  // Set username in session
    console.log("User logged in:", user.username);
    // Redirect to dashboard or send JSON response
    res.redirect("/dashboard/dashboard-user");
  } catch (error) {
    console.error("Error logging in:", error);
    res.status(500).render("login", {
      error: "Error logging in",
      showErrorLog: true,
    });
  }
};

const refreshToken = async (req, res) => {
  try {
    const refreshToken = req.cookies.refreshToken;

    if (!refreshToken) {
      return res.sendStatus(401);
    }

    jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, async (err, decoded) => {
      if (err) {
        console.error("Error verifying refresh token:", err);
        return res.sendStatus(403);
      }

      const user = await User.findById(decoded.user_id);

      if (!user || user.refresh_token !== refreshToken) {
        return res.sendStatus(403);
      }

      const accessToken = jwt.sign(
        { user_id: user._id, username: user.username },
        process.env.ACCESS_TOKEN_SECRET,
        { expiresIn: "15m" }
      );

      res.json({ accessToken });
    });
  } catch (error) {
    console.error("Error in refreshToken function:", error);
    res.sendStatus(500);
  }
};

module.exports = {
  loginPage,
  registerSubmit,
  loginSubmit,
  refreshToken,
};
