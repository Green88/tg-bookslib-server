/**
 * Created by Tania on 30/08/16.
 */

var AuthModel = require('../dbModels/AuthModel');
var UserPermission = require('../enums/user-permission').ENUM;
var RestResponse = require('../rest/RestResponse');
var uuid = require('node-uuid');
var jwtResolver = require('../util/jwt/token');

/**
 * @param {App} app
 */
module.exports = function(app) {
    app.post('/signin', signin);

    app.post('/signup', signup);

    // route model for any route that needs auth
    app.get('/authRoute', authRoute);

};

function authRoute(req, res) {
    var token = req.headers.authorization || null;
    if(!token) {
        RestResponse.unauthorized(res);
        return;
    }

    var extracted = null;
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

function signin(req, res) {
    var email = req.body.email;
    var password = req.body.password;

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

            var data = {
                token: jwtResolver.getToken(user),
                id: user._id
            };
            RestResponse.ok(res, data);
        });
    });


}

function signup(req, res) {
    var email = req.body.email;
    var password = req.body.password;

    if(!email || !password) {
        RestResponse.badRequest(res, ['email', 'password']);
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

        var user = new AuthModel({
            email: email,
            password: password,
            permission: UserPermission.NONE
        });

        user.save(function onUserSaved(error, user) {
            if(error) {
                RestResponse.serverError(res, error);
                return;
            }
            var data = {
                token: jwtResolver.getToken(user),
                id: user._id
            };
            RestResponse.ok(res, data);
        });
    });
}
