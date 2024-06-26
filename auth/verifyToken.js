const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
    try {
      const accessToken = req.cookies.accessToken;
  
      if (!accessToken) {
        return res.status(401).json("Not authenticated!");
      }
  
      const decoded = jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET);
      req.user = decoded;
      next();
    } catch (err) {
      console.log(err);
      return res.status(403).json("Token is not valid!");
    }
  };

module.exports = { verifyToken };
