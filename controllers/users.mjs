import { default as express } from 'express';
import { default as passport } from 'passport';
import { default as passportLocal } from 'passport-local';
const LocalStrategy = passportLocal.Strategy;
import passportTwitter from 'passport-twitter';
const TwitterStrategy = passportTwitter.Strategy;
import * as usersModel from '../models/users-superagent.mjs';

export const sessionCookieName = 'notescookie.sid';

export const router = express.Router();

export function initPassport(app) {
    app.use(passport.initialize());
    app.use(passport.session());
}

export function ensureAuthenticated(req, res, next) {
    try {
      // req.user is set by Passport in the deserialize function
      if (req.user) next();
      else res.redirect('/users/login');
    } catch (e) { next(e); }
}

passport.use(new LocalStrategy(
    async (username, password, done) => {
      try {
        var check = await usersModel.userPasswordCheck(username,
        password);
        if (check.check) {
          done(null, { id: check.username, username: check.username });
        } else {
          done(null, false, check.message);
        }
      } catch (e) { done(e); }
    }
));

passport.serializeUser(function(user, done) {
    try {
      done(null, user.username);
    } catch (e) { done(e); }
});

passport.deserializeUser(async (username, done) => {
    try {
      let user = await usersModel.find(username);
      done(null, user);
    } catch(e) { done(e); }
});

const twittercallback = process.env.TWITTER_CALLBACK_HOST
    ? process.env.TWITTER_CALLBACK_HOST
    : "http://localhost:3000";
export var twitterLogin;

if (typeof process.env.TWITTER_CONSUMER_KEY !== 'undefined'
  && process.env.TWITTER_CONSUMER_KEY !== ''
  && typeof process.env.TWITTER_CONSUMER_SECRET !== 'undefined'
  && process.env.TWITTER_CONSUMER_SECRET !== '') {
  passport.use(new TwitterStrategy({
    consumerKey: process.env.TWITTER_CONSUMER_KEY,
    consumerSecret: process.env.TWITTER_CONSUMER_SECRET,
    callbackURL: `${twittercallback}/users/auth/twitter/callback`
  },
  async function(token, tokenSecret, profile, done) {
    try {
      done(null, await usersModel.findOrCreate({
        id: profile.username, username: profile.username, password: "",
        provider: profile.provider, familyName: profile.displayName,
        givenName: "", middleName: "",
        photos: profile.photos, emails: profile.emails
      }));
    } catch(err) { done(err); }
  }));

  twitterLogin = true;
} else {
  twitterLogin = false;
}
