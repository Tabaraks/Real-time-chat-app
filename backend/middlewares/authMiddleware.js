const jwt = require("jsonwebtoken");
const User = require("../models/userModel");
const asyncHandler = require("express-async-handler");

const protect = asyncHandler(async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      token = req.headers.authorization.split(" ")[1];
      const decodeToken = jwt.verify(token, process.env.JWT_SECRET);

      req.user = await User.findById(decodeToken.id).select("-password");
      next();
    } catch (error) {
      res.status(401);
      throw new Error("Not Authorized, wrong token");
    }
  }

  if (!token) {
    res.status(401);
    throw new Error("Token not found");
  }
});

module.exports = { protect };
