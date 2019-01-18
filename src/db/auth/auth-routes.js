import omit from 'lodash/omit';
import passport from 'passport';
import passportService from './passport';
import UserModel from '../users/user-model';
import UserPermission from '../users/user-permission';
import RestResponse from '../../utils/rest/RestResponse';
import jwtResolver from '../../utils/jwt/token';
import hash from '../../utils/hash/hash';
import validate from '../../utils/joi/validation';
import { validateUsernameTakenSchema, signupSchema } from './auth-validation';


export default (app) => {
    app.post('/signin', signin);

    app.post('/signup', signup);

    app.get('/user/get', getUserByToken);

    app.get('/validate/:username', validateUsernameTaken);
};


const validateUsernameTaken = async (req, res) => {
    const { username } = req.params;
    const validationResult = validate(username, validateUsernameTakenSchema);
    if (validationResult) {
        RestResponse.badRequest(res, username);
        return;
    }

    const user = await UserModel.findOne({ username });

    if (user) {
        RestResponse.conflict(res, ['user']);
        return;
    }
    RestResponse.ok(res, username);
};

const getUserByToken = async (req, res) => {
    const token = req.headers.authorization || null;

    let extracted = null;
    try {
        extracted = jwtResolver.extractUserIdFromToken(token);

    } catch(error) {
        console.log(error);
        RestResponse.unauthorized(res);
        return;
    }

    const user = await UserModel.findById(extracted.userId);
    if (!user) {
        RestResponse.notFound(res, 'user');
        return;
    }

    const data = _formatUserResponse(token, user);

    RestResponse.ok(res, data);
};

const signin = (req, res, next) =>
    passport.authenticate('local', (err, data) => {
        if(err) {
            res.error(err);
            return;
        }
        RestResponse.ok(res, data);
    })(req, res, next)

const signup = async (req, res) => {
    const { email, password, username }  = req.body;

    const validationResult = validate({ email, password, username }, signupSchema);

    if(validationResult) {
        RestResponse.badRequest(res, [email, password, username]);
        return;
    }

    if(!email || !password || !username) {
        RestResponse.badRequest(res, ['email', 'password', 'username']);
        return;
    }

    const hashedPwd = await hash.hashPassword(password);
    const exist = await UserModel.findOne({email: email});
    if(exist) {
        // user already exists - conflict error code
        RestResponse.conflict(res, ['user']);
        return;
    }

    const user = new UserModel({
        email,
        username,
        password: hashedPwd,
        permission: UserPermission.NONE
    });

    const saved = await user.save();
    const data = _formatUserResponse(jwtResolver.getToken(saved), saved.toObject());
    RestResponse.ok(res, data);
};

const _formatUserResponse = (token, user) => omit({
    token: token,
    ...user
}, 'password');
