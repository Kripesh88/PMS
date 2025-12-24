const jwt = require('jsonwebtoken');

const ACCESS_SECRET = process.env.SECRET;

module.exports = {
  // Generate a new access token
  generateAccessToken(payload) {
    return jwt.sign(payload, ACCESS_SECRET, {
      expiresIn: "7d",
    });
  },

  // Verify a token and return decoded payload
  verifyAccessToken(token) {
    if (!token) throw new Error("Token missing");

    try {
      const decoded = jwt.verify(token, ACCESS_SECRET);
      return decoded; // contains payload like { id: 1, email: "...", iat: ..., exp: ... }
    } catch (err) {
      throw new Error("Invalid or expired token");
    }
  },
};
