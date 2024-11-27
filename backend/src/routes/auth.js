import express from "express";
import passport from "passport";
import { Strategy as OAuth2Stratedy } from "passport-oauth2";

const { CLIENT_ID, CLIENT_SECRET } = process.env;
const router = express.Router();

passport.use(new Strategy({
    authorizationURL: 'https://api.intra.42.fr/oauth/authorize',
    tokenURL: 'https://api.intra.42.fr/oauth/token',
    clientID: CLIENT_ID,
    clientSecret: CLIENT_SECRET,
    callbackURL: "http://localhost:3000/auth/callback"
  },
  function(accessToken, refreshToken, profile, cb) {
    User.findOrCreate({ exampleId: profile.id }, function (err, user) {
      return cb(err, user);
    });
  }
));

router.get("/", passport.authenticate('oauth2'));

router.get("/callback",   passport.authenticate('oauth2', { failureRedirect: '/login' }),
  function(req, res) {
    // Successful authentication, redirect home.
    res.redirect('/');
  });

export default router;
