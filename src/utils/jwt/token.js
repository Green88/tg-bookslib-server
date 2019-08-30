const { sign, verify } = require('jsonwebtoken');
const { jwtSecret} = require('../../config');

const options = {
    expiresIn: '60 days',
    issuer: 'tg bookslib'
};

module.exports = {
    getToken: function(user) {
        const payload = {
            userId: user._id,
            permission: user.permission
        };
        return sign(payload, jwtSecret, options);
    },

    extractUserIdFromToken: function(token) {
        const decoded = verify(token, jwtSecret);
        return decoded.userId;
    }
};