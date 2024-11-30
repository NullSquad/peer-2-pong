import express from "express";
import passport from "passport";
import OAuth2Strategy from "passport-oauth2";

const { CALLBACK_URL, CLIENT_ID, CLIENT_SECRET } = process.env;
const router = express.Router();

passport.use(
  new OAuth2Strategy(
    {
      authorizationURL: "https://api.intra.42.fr/oauth/authorize",
      tokenURL: "https://api.intra.42.fr/oauth/token",
      clientID: CLIENT_ID,
      clientSecret: CLIENT_SECRET,
      callbackURL: CALLBACK_URL,
    },
    (accessToken, refreshToken, profile, done) => {
      return done(null, profile);
    },
  ),
);

passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((user, done) => {
  done(null, user);
});

router.get("/", (req, res) => {
  res.json(req.user);
});

router.get("/login", passport.authenticate("oauth2"));

router.get('/callback', passport.authenticate('oauth2', { failureRedirect: '/' }), (req, res) => {
  res.redirect('/');
});

router.post('/logout', function(req, res, next) {
  req.logout(function(err) {
    if (err) { return next(err); }
    res.redirect('/');
  });
});

export default router;
