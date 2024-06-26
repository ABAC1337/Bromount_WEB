const userDashboardPage = (req, res) => {
  // Assuming username is stored in req.session.username
  const username = req.session.username;
  
  // Debugging log
  console.log("Received dashboard request for user:", username);
  
  if (!username) {
    return res.redirect('/login');
  }

  res.render("dashboard-user", {
    name: username,
    succeededLog: true
  });
};

const logout = (req, res) => {
  console.log("Received logout request");
  res.clearCookie("accessToken");
  res.clearCookie("refreshToken");
  req.session.destroy((err) => {
    if (err) {
      console.error("Error destroying session:", err);
    }
    res.redirect("/login");
  });
};

module.exports = { userDashboardPage, logout };
