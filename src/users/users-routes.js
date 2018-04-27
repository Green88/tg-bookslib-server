import User from './user-model';
import RestResponse from '../utils/rest/RestResponse';

/**
 * @param {App} app
 */
module.exports = function(app) {
    app.get('/profile/:id', getUserById);

    app.post('/profile/create', createProfile);

    app.post('/profile/update', updateProfile);
};

function getUserById(req, res) {
    const id = req.params.id;
    if(!id) {
        RestResponse.badRequest(req, ['id']);
        return;
    }

    User.findOne({userId: id}, function onFoundProfile(error, profile) {
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
    const id = req.body.id;
    const username = req.body.username;

    if(!id) {
        RestResponse.badRequest(res, ['id']);
        return;
    }

    const user = new User({
        userId: id,
        username: username,
        name: '',
        bio: '',
        imageUrl: '',
        isAuthor: false
    });

    user.save((error, saved) => {
        if(error) {
            RestResponse.serverError(res, error);
            return;
        }

        RestResponse.ok(res, saved);
    });
}

function updateProfile(req, res) {

}