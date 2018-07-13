import passport from 'passport';
import { Strategy as JwtStrategy, ExtractJwt } from 'passport-jwt';
import LocalStrategy from 'passport-local';
import omit from 'lodash/omit';
import UserModel from '../users/user-model';
import keys from '../../config/index';
import hash from '../../utils/hash/hash';
import jwtResolver from '../../utils/jwt/token';

// Create local strategy
const localOptions = { usernameField: 'email', session: false };

const localLogin = new LocalStrategy(localOptions, async (email, password, done) => {
    const user = await UserModel.findOne({ email });
    if (!user) {
        return done(new Error('User not found'), null);
    }

    const isMatch = await hash.comparePassword(password, user.password);
    if (!isMatch) {
        return done(new Error('Wrong username or password'), null);
    }

    const token = jwtResolver.getToken(user);
    const authUser = Object.assign({}, user.toObject(), { token });
    return done(null, omit(authUser, 'password'));
});

// Setup options for JWT Strategy
const jwtOptions = {
    jwtFromRequest: ExtractJwt.fromHeader('authorization'),
    secretOrKey: keys.jwtSecret
};

// Create JWT strategy
const jwtLogin = new JwtStrategy(jwtOptions, async (payload, done) => {
    const user = await UserModel.findOne({userId: payload.userId});
    if (user) {
        done(null, user);
    } else {
        done(null, false);
    }
});

passport.use(jwtLogin);
passport.use(localLogin);
