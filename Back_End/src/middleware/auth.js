const jwt = require('jsonwebtoken');
require('dotenv').config();

const verifyToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  if (!authHeader) {
    return res.status(403).json({
      status: 403,
      message: "No token provided",
    });
  }

  const token = authHeader.split(' ')[1];
  if (!token) {
    return res.status(403).json({
      status: 403,
      message: "Token format is invalid",
    });
  }

  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
    if (err) {
      if (err.name === "JsonWebTokenError") {
        return res.status(403).json({ status: 403, message: "Invalid token" });
      } else if (err.name === "TokenExpiredError") {
        return res.status(403).json({ status: 403, message: "Token has expired" });
      } else {
        console.error(err);
        return res.status(500).json({ status: 500, message: "Internal Server Error" });
      }
    }

    req.user = decoded;
    next();
  });
};

module.exports = verifyToken;