import AuthModel from './auth-model';
import UserPermission from '../users/user-permission';
import RestResponse from '../utils/rest/RestResponse';
import jwtResolver from '../utils/jwt/token';

/**
 * @param {App} app
 */
module.exports = function(app) {
    app.post('/signin', signin);

    app.post('/signup', signup);

    app.get('/user/get', getUserByToken);

    app.get('/validate/:username', validateUsernameTaken);

    // route model for any route that needs auth
    app.get('/authRoute', authRoute);

};

function authRoute(req, res) {
    const token = req.headers.authorization || null;
    if(!token) {
        RestResponse.unauthorized(res);
        return;
    }

    let extracted = null;
    try {
        extracted = jwtResolver.extractUserIdFromToken(token);

    } catch(error) {
        console.log(error);
        RestResponse.unauthorized(res);
        return;
    }

    AuthModel.findOne({userId: extracted.sub}, function(error, user) {
        if (error) {
            RestResponse.serverError(res, error);
            return;
        }

        if(!user) {
            RestResponse.notFound(res, 'user');
            return;
        }

        RestResponse.ok(res, {message: 'This route requires auth'});

    });

}

function validateUsernameTaken(req, res) {
    const username = req.params.username;

    if(!username) {
        RestResponse.badRequest(res, ['username']);
        return;
    }

    AuthModel.findOne({username: username}, function(error, user) {
        if (error) {
            RestResponse.serverError(res, error);
            return;
        }

        if (user) {
            RestResponse.conflict(res, ['user']);
            return;
        }

        RestResponse.ok(res, username);
    });
}

function getUserByToken(req, res) {
    const token = req.headers.authorization || null;
    if(!token) {
        RestResponse.unauthorized(res);
        return;
    }

    let extracted = null;
    try {
        extracted = jwtResolver.extractUserIdFromToken(token);

    } catch(error) {
        console.log(error);
        RestResponse.unauthorized(res);
        return;
    }

    AuthModel.findById(extracted.sub, function(error, user) {
        if (error) {
            RestResponse.serverError(res, error);
            return;
        }

        if(!user) {
            RestResponse.notFound(res, 'user');
            return;
        }

        const data = _composeUserData(token, user);

        RestResponse.ok(res, data);

    });
}

function signin(req, res) {
    const email = req.body.email;
    const password = req.body.password;

    if(!email || !password) {
        RestResponse.badRequest(res, ['email', 'password']);
        return;
    }

    AuthModel.findOne({email: email}, function onUserFound(error, user) {
        if(error) {
            RestResponse.serverError(res, error);
            return;
        }

        if(!user) {
            RestResponse.notFound(res, 'user');
            return;
        }

        user.comparePassword(password, function(error, isMatch) {
            if (error) {
                RestResponse.serverError(res, error);
                return;
            }
            if (!isMatch) {
                RestResponse.unauthorized(res);
                return;
            }

            const data = _composeUserData(jwtResolver.getToken(user), user);
            RestResponse.ok(res, data);
        });
    });


}

function signup(req, res) {
    const email = req.body.email;
    const password = req.body.password;
    const username = req.body.username;

    if(!email || !password || !username) {
        RestResponse.badRequest(res, ['email', 'password', 'username']);
        return;
    }

    AuthModel.findOne({email: email}, function onGotResponse(error, auth) {
        if(error) {
            RestResponse.serverError(res, error);
            return;
        }

        if(auth) {
            // user already exists - conflict error code
            RestResponse.conflict(res, ['user']);
            return;
        }

        const user = new AuthModel({
            email: email,
            password: password,
            username: username,
            permission: UserPermission.NONE
        });

        user.save(function onUserSaved(error, user) {
            if(error) {
                RestResponse.serverError(res, error);
                return;
            }
            const data = _composeUserData(jwtResolver.getToken(user), user);
            RestResponse.ok(res, data);
        });
    });
}
/**
 * @param {string} token
 * @param {Object} user
 * @private
 */
function _composeUserData(token, user) {
    return {
        token: token,
        user: {
            id: user._id,
            username: user.username,
            permission: user.permission
        }
    };
}