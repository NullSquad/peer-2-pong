import express from "express";
import passport from "passport";
import session from "express-session";
import OAuth2Strategy from "passport-oauth2";

const { CALLBACK_URL, CLIENT_ID, CLIENT_SECRET } = process.env;
const router = express.Router();

const AUTHORIZATION_URL = "https://api.intra.42.fr/oauth/authorize";
const TOKEN_URL = "https://api.intra.42.fr/oauth/token";
const USER_INFO_URL = "https://api.intra.42.fr/v2/me";

router.use(
  session({
    key: "user",
    secret: CLIENT_SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: {
      expires: 60 * 60 * 1000,
      httpOnly: false,
    },
  }),
);

router.use((req, res, next) => {
  var msgs = req.session.messages || [];
  res.locals.messages = msgs;
  res.locals.hasMessages = !!msgs.length;
  req.session.messages = [];
  next();
});

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
        const { login, email, image } = data;
        const user = {
          login,
          email,
          image: image.link,
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

router.use(passport.initialize());
router.use(passport.session());

router.get("/", passport.authenticate("oauth2"));

router.get(
  "/callback",
  passport.authenticate("oauth2", {
    successReturnToOrRedirect: "/",
    failureRedirect: "/login",
  }),
);

router.post("/logout", (req, res, next) => {
  req.logout(function (err) {
    if (err) {
      return next(err);
    }
    res.redirect("/");
  });
});

export default router;
