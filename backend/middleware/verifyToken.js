import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "your_secret_key_here";

export default function verifyToken(req, res, next) {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({ valid: false, message: "Missing Authorization header" });
  }

  const token = authHeader.split(" ")[1];

  if (!token) {
    return res.status(401).json({ valid: false, message: "No token provided" });
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded; // save decoded user info
    next(); // continue to next handler
  } catch (err) {
    console.error("❌ Token verification failed:", err.message);
    return res.status(403).json({ valid: false, message: "Invalid or expired token" });
  }
}
