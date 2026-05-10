const User = require("../models/User");
const { sendAuthCookie } = require("../utils/tokens");

function sanitizeUser(user) {
  return User.sanitizeUser(user);
}

async function register(req, res, next) {
  try {
    const { name, email, password, rememberMe } = req.body;

    const existingUser = await User.findByEmail(email);
    if (existingUser) {
      return res.status(409).json({ message: "An account with this email already exists." });
    }

    const user = await User.createUser({ name, email, password, provider: "local" });
    const token = sendAuthCookie(res, user, Boolean(rememberMe));

    res.status(201).json({
      message: "Account created successfully.",
      token,
      user: sanitizeUser(user),
    });
  } catch (error) {
    next(error);
  }
}

async function login(req, res, next) {
  try {
    const { email, password, rememberMe } = req.body;

    const user = await User.findByEmail(email, { includePassword: true });
    if (!user || !(await User.comparePassword(user, password))) {
      return res.status(401).json({ message: "Invalid email or password." });
    }

    const updatedUser = await User.updateUser(user.id, { lastLoginAt: new Date().toISOString() });
    const token = sendAuthCookie(res, user, Boolean(rememberMe));

    res.json({
      message: "Logged in successfully.",
      token,
      user: sanitizeUser(updatedUser),
    });
  } catch (error) {
    next(error);
  }
}

function logout(_req, res) {
  res.clearCookie("token");
  res.json({ message: "Logged out successfully." });
}

async function me(req, res) {
  res.json({ user: sanitizeUser(req.user) });
}

async function forgotPassword(req, res, next) {
  try {
    const { email } = req.body;
    const resetResult = await User.createPasswordResetToken(email);

    if (!resetResult) {
      return res.json({ message: "If an account exists, a reset link has been sent." });
    }

    const { resetToken, user } = resetResult;
    const resetUrl = `${process.env.CLIENT_URL || "http://localhost:5000"}/reset-password.html?token=${resetToken}`;
    if (process.env.NODE_ENV !== "production") {
      console.log(`Password reset URL for ${user.email}: ${resetUrl}`);
    }

    res.json({
      message: "If an account exists, a reset link has been sent.",
      resetUrl: process.env.NODE_ENV === "production" ? undefined : resetUrl,
    });
  } catch (error) {
    next(error);
  }
}

async function resetPassword(req, res, next) {
  try {
    const { token, password } = req.body;
    const user = await User.resetPassword(token, password);

    if (!user) {
      return res.status(400).json({ message: "Reset token is invalid or expired." });
    }

    sendAuthCookie(res, user, false);
    res.json({ message: "Password updated successfully.", user: sanitizeUser(user) });
  } catch (error) {
    next(error);
  }
}

function oauthSuccess(req, res) {
  const token = sendAuthCookie(res, req.user, true);
  const redirectUrl = `${process.env.CLIENT_URL || "http://localhost:5000"}/dashboard.html?token=${token}`;
  res.redirect(redirectUrl);
}

module.exports = {
  register,
  login,
  logout,
  me,
  forgotPassword,
  resetPassword,
  oauthSuccess,
};
