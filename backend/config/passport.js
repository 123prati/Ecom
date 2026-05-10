const passport = require("passport");
const FacebookStrategy = require("passport-facebook").Strategy;
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const User = require("../models/User");

async function findOrCreateOAuthUser({ provider, providerId, email, name }) {
  let user = await User.findOne({ provider, providerId });
  if (user) return user;

  if (email) {
    user = await User.findOne({ email });
    if (user) {
      user.provider = provider;
      user.providerId = providerId;
      await user.save();
      return user;
    }
  }

  return User.create({
    name: name || "Mercato Customer",
    email: email || `${providerId}@${provider}.oauth.local`,
    provider,
    providerId,
    isEmailVerified: Boolean(email),
  });
}

function configurePassport() {
  if (process.env.GOOGLE_CLIENT_ID && process.env.GOOGLE_CLIENT_SECRET) {
    passport.use(
      new GoogleStrategy(
        {
          clientID: process.env.GOOGLE_CLIENT_ID,
          clientSecret: process.env.GOOGLE_CLIENT_SECRET,
          callbackURL: process.env.GOOGLE_CALLBACK_URL,
        },
        async (_accessToken, _refreshToken, profile, done) => {
          try {
            const email = profile.emails?.[0]?.value;
            const user = await findOrCreateOAuthUser({
              provider: "google",
              providerId: profile.id,
              email,
              name: profile.displayName,
            });
            done(null, user);
          } catch (error) {
            done(error, null);
          }
        }
      )
    );
  }

  if (process.env.FACEBOOK_APP_ID && process.env.FACEBOOK_APP_SECRET) {
    passport.use(
      new FacebookStrategy(
        {
          clientID: process.env.FACEBOOK_APP_ID,
          clientSecret: process.env.FACEBOOK_APP_SECRET,
          callbackURL: process.env.FACEBOOK_CALLBACK_URL,
          profileFields: ["id", "displayName", "emails"],
        },
        async (_accessToken, _refreshToken, profile, done) => {
          try {
            const email = profile.emails?.[0]?.value;
            const user = await findOrCreateOAuthUser({
              provider: "facebook",
              providerId: profile.id,
              email,
              name: profile.displayName,
            });
            done(null, user);
          } catch (error) {
            done(error, null);
          }
        }
      )
    );
  }
}

module.exports = configurePassport;
