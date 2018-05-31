import jwt from 'jwt-simple';
import { jwtSecret} from '../../config';

module.exports = {
    getToken: function(user) {
        const timestamp = new Date().getTime();
        return jwt.encode({ sub: user._id, iat: timestamp }, jwtSecret);
    },

    extractUserIdFromToken: function(token) {
        return jwt.decode(token, jwtSecret);
    }
};