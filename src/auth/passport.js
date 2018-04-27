import passport from 'passport';
import { Strategy as JwtStrategy, ExtractJwt } from 'passport-jwt';
import LocalStrategy from 'passport-local';
import AuthModel from './auth-model';
import keys from '../config';

// Create local strategy
const localOptions = { usernameField: 'email' };
const localLogin = new LocalStrategy(localOptions, function(email, password, done) {
    // Verify this email and password, call done with the user
    // if it is the correct email and password
    // otherwise, call done with false
    AuthModel.findOne({ email: email }, function(error, user) {
        if (error) {
            return done(error, null);
        }
        if (!user) {
            return done(null, null);
        }

        // compare passwords - is `password` equal to user.password?
        user.comparePassword(password, function(err, isMatch) {
            if (err) {
                return done(err, null);
            }
            if (!isMatch) {
                return done(null, null);
            }

            return done(null, user);
        });
    });
});

// Setup options for JWT Strategy
const jwtOptions = {
    jwtFromRequest: ExtractJwt.fromHeader('authorization'),
    secretOrKey: keys.jwtSecret
};

// Create JWT strategy
const jwtLogin = new JwtStrategy(jwtOptions, function(payload, done) {
    // See if the user ID in the payload exists in our database
    // If it does, call 'done' with that other
    // otherwise, call done without a user object
    AuthModel.findOne({userId: payload.sub}, function(err, user) {
        if (err) { return done(err, false); }

        if (user) {
            done(null, user);
        } else {
            done(null, false);
        }
    });
});

// Tell passport to use this strategy
passport.use(jwtLogin);
passport.use(localLogin);
