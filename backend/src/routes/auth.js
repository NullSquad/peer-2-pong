import express from "express";
import passport from "passport";
import OAuth2Strategy from "passport-oauth2";
import { ObjectId } from "mongodb";
import verifyAuth from "../middleware/auth.js";

const { CALLBACK_URL, CLIENT_ID, CLIENT_SECRET } = process.env;
const router = express.Router();

const AUTHORIZATION_URL = "https://api.intra.42.fr/oauth/authorize";
const TOKEN_URL = "https://api.intra.42.fr/oauth/token";
const USER_INFO_URL = "https://api.intra.42.fr/v2/me";

passport.use(
  new OAuth2Strategy(
    {
      authorizationURL: AUTHORIZATION_URL,
      tokenURL: TOKEN_URL,
      clientID: CLIENT_ID,
      clientSecret: CLIENT_SECRET,
      callbackURL: CALLBACK_URL,
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        const response = await fetch(USER_INFO_URL, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });
        const data = await response.json();
        const { id, email, login, image, campus } = data;
        const user = {
          id: ObjectId.createFromTime(id),
          email,
          login,
          image: image.link,
          campus: campus[0].name,
        };
        return done(null, user);
      } catch (error) {
        return done(error);
      }
    },
  ),
);

passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((obj, done) => {
  done(null, obj);
});

router.get("/", passport.authenticate("oauth2"));

router.get(
  "/callback",
  passport.authenticate("oauth2", {
    successReturnToOrRedirect: "/",
    failureRedirect: "/login",
  }),
);

router.get("/session", verifyAuth, (req, res) => {
  res.send(req.user);
});

router.post("/logout", (req, res, next) => {
  req.logout((err) => {
    if (err) {
      return next(err);
    }
    res.redirect("/");
  });
});

export default router;
