import express from "express";
import passport from "passport";
import session from "express-session";
import OAuth2Strategy from "passport-oauth2";

// Originalmente, se obtenían las variables directamente de process.env
// const { CALLBACK_URL, CLIENT_ID, CLIENT_SECRET } = process.env;

import dotenv from "dotenv";

// Configuración de dotenv para cargar las variables desde el archivo .env
dotenv.config();

const { CALLBACK_URL, CLIENT_ID, CLIENT_SECRET } = process.env;

// Validación para asegurarse de que todas las variables requeridas están definidas
if (!CALLBACK_URL || !CLIENT_ID || !CLIENT_SECRET) {
  throw new Error("Missing required environment variables in .env");
}

const router = express.Router();

const AUTHORIZATION_URL = "https://api.intra.42.fr/oauth/authorize";
const TOKEN_URL = "https://api.intra.42.fr/oauth/token";
const USER_INFO_URL = "https://api.intra.42.fr/v2/me";

// La sesión anteriormente usaba CLIENT_SECRET como clave secreta, es mejor reemplazarlo
// router.use(
//   session({ secret: CLIENT_SECRET, resave: false, saveUninitialized: true }),
// );
router.use(
  session({
    secret: "a-very-secure-random-string", // Cambia por una cadena segura
    resave: false,
    saveUninitialized: true,
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
          image: image?.link || null,
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

router.get("/session", (req, res) => {
  if (req.isAuthenticated()) {
    res.json({ user: req.user });
  } else {
    res.status(401).json({ message: "Unauthorized" });
  }
});

router.post("/logout", function (req, res, next) {
  req.logout(function (err) {
    if (err) {
      return next(err);
    }
    res.redirect("/");
  });
});

export default router;
