/**
 * Created by Tania on 19/09/16.
 */
var jwt = require('jwt-simple');
var config = require('../../config');

module.exports = {
    getToken: function(user) {
        var timestamp = new Date().getTime();
        return jwt.encode({ sub: user._id, iat: timestamp }, config.secret);
    },

    extractUserIdFromToken: function(token) {
        return jwt.decode(token, config.secret);
    }


};