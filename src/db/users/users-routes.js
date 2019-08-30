const User = require( './user-model');
const RestResponse = require( '../../utils/rest/RestResponse');

module.exports = app => {
    app.get('/users', getUsers);

    app.get('/users/:id', getUserById);

    app.put('/users/:id', updateUser);
};

const getUsers = async (req, res) => {
    const users = await User.find({});
    RestResponse.ok(res, users);
};

const getUserById = async(req, res) => {
    const id = req.params.id;
    if(!id) {
        RestResponse.badRequest(req, ['id']);
        return;
    }

    const user = await User.findOne({userId: id});
    if(!user) {
        RestResponse.notFound(res, 'user');
        return;
    }

    RestResponse.ok(res, user);
};


const updateUser = async (req, res) => {
    const id = req.params.id;
    const userData = req.body.data;
    const updated = await User.updateOne({ id }, userData );
    RestResponse.ok(res, updated);
};