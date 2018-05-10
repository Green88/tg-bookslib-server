import UserModel from '../users/user-model';
import UserPermission from '../users/user-permission';
import RestResponse from '../../utils/rest/RestResponse';
import jwtResolver from '../../utils/jwt/token';


export default (app) => {
    app.post('/signin', signin);

    app.post('/signup', signup);

    app.get('/user/get', getUserByToken);

    app.get('/validate/:username', validateUsernameTaken);
};

const validateUsernameTaken = async (req, res) => {
    const username = req.params.username;

    const user = await UserModel.findOne({username: username});

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

    const user = await UserModel.findById(extracted.sub);
    if (!user) {
        RestResponse.notFound(res, 'user');
        return;
    }

    const data = _composeUserData(token, user);

    RestResponse.ok(res, data);
};

const signin = async (req, res) => {
    const email = req.body.email;
    const password = req.body.password;

    const user = UserModel.findOne({email: email});
    if(!user) {
        RestResponse.notFound(res, 'user');
        return;
    }
    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
        RestResponse.unauthorized(res);
        return;
    }
    const data = _composeUserData(jwtResolver.getToken(user), user);
    RestResponse.ok(res, data);
};

const signup = async (req, res) => {
    const email = req.body.email;
    const password = req.body.password;
    const username = req.body.username;

    if(!email || !password || !username) {
        RestResponse.badRequest(res, ['email', 'password', 'username']);
        return;
    }

    const exist = await UserModel.findOne({email: email});
    if(exist) {
        // user already exists - conflict error code
        RestResponse.conflict(res, ['user']);
        return;
    }

    const user = new UserModel({
        email: email,
        password: password,
        username: username,
        permission: UserPermission.NONE
    });

    const saved = await user.save();
    const data = _composeUserData(jwtResolver.getToken(user), user);
    RestResponse.ok(res, data);
};

const _composeUserData = (token, user) => ({
    token: token,
    user: {
        id: user._id,
        username: user.username,
        permission: user.permission
    }
});
