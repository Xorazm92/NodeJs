import { Router } from "express";
import passport from "passport";
import { Strategy } from "passport-google-oauth20";
import { config } from "../configs/index.js";
import { authContoller, otpController, otpVrifay } from "../controllers/auth.controller.js";
export const authRouter = new Router();
const GoogleStrategy = Strategy;

authRouter.use(passport.initialize());
authRouter.use(passport.session());

passport.use(
  new GoogleStrategy(
    {
      clientID: config.google_app.google_id,
      clientSecret: config.google_app.google_secret,
      callbackURL: "/auth/google/callback",
    },
    (accessToken, refreshToken, profile, done) => {
      return done(null, profile);
    }
  )
);

passport.serializeUser((user, done) => done(null, user));
passport.deserializeUser((obj, done) => done(null, obj));

authRouter.get(
  "/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

authRouter.get(
  "/google/callback",
  passport.authenticate("google", { failureRedirect: "/" }),
  (req, res) => {
    res.redirect("/auth/otp");
  }
);
authRouter.get('/otp', otpController)
authRouter.get('/vrifayOtp/:id', otpVrifay)


authRouter.get("/profile", authContoller);

authRouter.get('/logout', (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      console.error("Sessiyani o'chirishda xato:", err);
      return res.status(500).send("Xatolik yuz berdi.");
    }
    res.redirect('/login');
  });
});
