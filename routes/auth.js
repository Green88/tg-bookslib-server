/**
 * Created by Tania on 30/08/16.
 */

var AuthModel = require('../dbModels/AuthModel');
var UserPermission = require('../enums/user-permission').ENUM;
var uuid = require('node-uuid');

/**
 * @param {App} app
 */
module.exports = function(app) {
    app.post('/signin', signin);

    app.post('/signup', signup);

};

function signin(req, res, next) {

}

function signup(req, res) {
    var email = req.body.email;
    var password = req.body.password;

    AuthModel.findOne({email: email}, function onGotResponse(error, response) {
        if(error) {
            next(error);
            return;
        }

        if(response) {
            // user already exists - conflict error code
            res.status(409).send({error: 'Email already exists'});
            return;
        }

        var user = new AuthModel({
            email: email,
            password: password,
            permission: UserPermission.NONE,
            userId: 123
        });

        user.save(function onSaved(error, response) {
            if(error) {
                next(error);
                return;
            }

            res.json(response);
        });
    });
}
