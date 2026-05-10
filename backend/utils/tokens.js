const jwt = require("jsonwebtoken");

function signToken(user, remember = false) {
  const expiresIn = remember ? process.env.JWT_REMEMBER_EXPIRES_IN || "30d" : process.env.JWT_EXPIRES_IN || "1d";
  return jwt.sign({ id: user.id, role: user.role }, process.env.JWT_SECRET, { expiresIn });
}

function cookieOptions(remember = false) {
  return {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
    maxAge: remember ? 30 * 24 * 60 * 60 * 1000 : 24 * 60 * 60 * 1000,
  };
}

function sendAuthCookie(res, user, remember = false) {
  const token = signToken(user, remember);
  res.cookie("token", token, cookieOptions(remember));
  return token;
}

module.exports = { signToken, cookieOptions, sendAuthCookie };
