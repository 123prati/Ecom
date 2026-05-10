const express = require("express");
const passport = require("passport");
const { body } = require("express-validator");
const {
  forgotPassword,
  login,
  logout,
  me,
  oauthSuccess,
  register,
  resetPassword,
} = require("../controllers/authController");
const { protect } = require("../middleware/authMiddleware");
const validate = require("../middleware/validateMiddleware");

const router = express.Router();

function requireOAuthConfig(provider) {
  return (req, res, next) => {
    const googleReady = process.env.GOOGLE_CLIENT_ID && process.env.GOOGLE_CLIENT_SECRET;
    const facebookReady = process.env.FACEBOOK_APP_ID && process.env.FACEBOOK_APP_SECRET;
    const ready = provider === "google" ? googleReady : facebookReady;

    if (!ready) {
      return res.status(503).json({
        message: `${provider} OAuth is not configured. Add the provider credentials to your .env file.`,
      });
    }

    next();
  };
}

router.post(
  "/register",
  [
    body("name").trim().isLength({ min: 2 }).withMessage("Name must be at least 2 characters."),
    body("email").isEmail().normalizeEmail().withMessage("Enter a valid email address."),
    body("password").isLength({ min: 6 }).withMessage("Password must be at least 6 characters."),
  ],
  validate,
  register
);

router.post(
  "/login",
  [
    body("email").isEmail().normalizeEmail().withMessage("Enter a valid email address."),
    body("password").notEmpty().withMessage("Password is required."),
  ],
  validate,
  login
);

router.post(
  "/forgot-password",
  [body("email").isEmail().normalizeEmail().withMessage("Enter a valid email address.")],
  validate,
  forgotPassword
);

router.post(
  "/reset-password",
  [
    body("token").notEmpty().withMessage("Reset token is required."),
    body("password").isLength({ min: 6 }).withMessage("Password must be at least 6 characters."),
  ],
  validate,
  resetPassword
);

router.post("/logout", logout);
router.get("/me", protect, me);

router.get(
  "/google",
  requireOAuthConfig("google"),
  passport.authenticate("google", { scope: ["profile", "email"], session: false })
);
router.get(
  "/google/callback",
  requireOAuthConfig("google"),
  passport.authenticate("google", { session: false, failureRedirect: "/index.html?error=google-auth-failed" }),
  oauthSuccess
);

router.get(
  "/facebook",
  requireOAuthConfig("facebook"),
  passport.authenticate("facebook", { scope: ["email"], session: false })
);
router.get(
  "/facebook/callback",
  requireOAuthConfig("facebook"),
  passport.authenticate("facebook", { session: false, failureRedirect: "/index.html?error=facebook-auth-failed" }),
  oauthSuccess
);

module.exports = router;
