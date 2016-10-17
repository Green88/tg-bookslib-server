/**
 * Created by Tania on 02/10/16.
 */
var uuid = require('node-uuid');
var ProfileModel = require('../dbModels/ProfileModel');
var RestResponse = require('../rest/RestResponse');

/**
 * @param {App} app
 */
module.exports = function(app) {
    app.get('/profile/:id', getProfileById);

    app.post('/profile/create', createProfile);

    app.post('/profile/update', updateProfile);
};

function getProfileById(req, res) {
    var id = req.params.id;
    if(!id) {
        RestResponse.badRequest(req, ['id']);
        return;
    }

    ProfileModel.findOne({userId: id}, function onFoundProfile(error, profile) {
        if(error) {
            RestResponse.serverError(res, error);
            return;
        }

        if(!profile) {
            RestResponse.notFound(res, 'profile');
            return;
        }

        RestResponse.ok(res, profile);
    })
}

function createProfile(req, res) {
    var id = req.body.id;
    var username = req.body.username;

    if(!id) {
        RestResponse.badRequest(res, ['id']);
        return;
    }

    var profile = new ProfileModel({
        userId: id,
        username: username,
        name: '',
        bio: '',
        imageUrl: '',
        isAuthor: false
    });

    profile.save(function onProfileCreated(error, profile) {
        if(error) {
            RestResponse.serverError(res, error);
            return;
        }

        RestResponse.ok(res, profile);
    });
}

function updateProfile(req, res) {

}