import jwt from "jsonwebtoken";
import User from "../models/user.model.js";

export const authenticate = async (req, res, next) => {
  try {
    const token = req.cookies?.jwt;
    if (!token) {
      return res.status(401).json({ message: "Unauthorized - No token provided" });
    }

    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);

    // Check if user still exists
    const user = await User.findById(decoded.id);  // 👈 FIXED
    if (!user) {
      return res.status(401).json({ message: "Unauthorized - User not found" });
    }

    // Attach user to request
    req.user = user;
    next();
  } catch (error) {
    return res.status(401).json({ message: "Unauthorized - " + error.message });
  }
};
