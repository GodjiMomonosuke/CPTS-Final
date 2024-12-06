const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const User = require('../models/user.model');

passport.use(
  new LocalStrategy(
    {
      usernameField: 'email',
      passwordField: 'password',
    },
    async (email, password, done) => {
      try {
        console.log('Login attempt for email:', email);
        const user = await User.findOne({ email });
        
        if (!user) {
          console.log('User not found:', email);
          return done(null, false, {
            message: 'Username/email not registered',
          });
        }

        const isMatch = await user.isValidPassword(password);
        if (!isMatch) {
          console.log('Invalid password for user:', email);
        }
        
        return isMatch
          ? done(null, user)
          : done(null, false, { message: 'Incorrect password' });
      } catch (error) {
        console.error('Authentication error:', error);
        done(error);
      }
    }
  )
);

passport.serializeUser(function (user, done) {
  done(null, user.id);
});

passport.deserializeUser(async function (id, done) {
  try {
    const user = await User.findById(id);
    done(null, user);
  } catch (error) {
    done(error, null);
  }
});