import passport from 'passport';
import { Strategy as JwtStrategy, ExtractJwt } from 'passport-jwt';
import LocalStrategy from 'passport-local';
import UserModel from '../users/user-model';
import keys from '../../config/index';

// Create local strategy
const localOptions = { usernameField: 'email' };

const localLogin = new LocalStrategy(localOptions, async (email, password, done) => {
    const user = await UserModel.findOne({ email });
    if (!user) {
        return done(null, null);
    }

    const isMatch = user.comparePassword(password);
    if (!isMatch) {
        return done(null, null);
    }

    return done(null, user);
});

// Setup options for JWT Strategy
const jwtOptions = {
    jwtFromRequest: ExtractJwt.fromHeader('authorization'),
    secretOrKey: keys.jwtSecret
};

// Create JWT strategy
const jwtLogin = new JwtStrategy(jwtOptions, async (payload, done) => {
    const user = await UserModel.findOne({userId: payload.sub});
    if (user) {
        done(null, user);
    } else {
        done(null, false);
    }
});

passport.use(jwtLogin);
passport.use(localLogin);
