import { default as express } from 'express';
import { default as passport } from 'passport';

import { sessionCookieName } from '../controllers/users.mjs';

export const router = express.Router();

router.get('/login', function(req, res, next) {
    try {
      res.render('login', {
        title: "Login",
        user: req.user, });
    } catch (e) { next(e); }
});

router.post('/login',
    passport.authenticate('local', {
      successRedirect: '/', // SUCCESS: Go to home page
      failureRedirect: 'login', // FAIL: Go to /user/login
    })
);

router.get('/logout', function(req, res, next) {
    try {
      req.session.destroy();
      // req.logout();
      res.clearCookie(sessionCookieName);
      res.redirect('/');
    } catch (e) { next(e); }
});

router.get('/auth/twitter', passport.authenticate('twitter'));

router.get('/auth/twitter/callback',
  passport.authenticate('twitter', { successRedirect: '/',
                       failureRedirect: '/users/login' }));

