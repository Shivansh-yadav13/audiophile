require("dotenv").config();
const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const pool = require("../database/db");
const isProduction = process.env.NODE_ENV === "production";
passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser(async (user, done) => {
  await pool
    .query("SELECT name, email, google_id FROM users WHERE id=$1", [user.id])
    .then((response) => {
      done(null, response.rows[0]);
    });
});

passport.use(
  new GoogleStrategy(
    {
      callbackURL: isProduction
        ? process.env.GOOGLE_CALLBACK_URL
        : "/auth/google/redirect",
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SERCRET,
    },
    async (_, __, profile, done) => {
      await pool
        .query("SELECT id, name, email FROM users WHERE google_id=$1", [
          profile.id,
        ])
        .then(async (userExist) => {
          if (userExist.rowCount) {
            const user = userExist.rows[0];
            done(null, user);
            return;
          }
          const name = profile.displayName,
            email = profile.emails[0].value,
            google_id = profile.id;

          await pool
            .query(
              "INSERT INTO users (name, email, password, google_id) VALUES ($1, $2, $3, $4) RETURNING id, name, email;",
              [name, email, null, google_id]
            )
            .then((newUser) => {
              const user = newUser.rows[0];
              done(null, user);
            });
        });
    }
  )
);

module.exports = passport;
