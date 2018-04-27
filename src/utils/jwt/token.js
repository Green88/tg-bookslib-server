import jwt from 'jwt-simple';
import { JWT_SECRET} from '../../config';

module.exports = {
    getToken: function(user) {
        const timestamp = new Date().getTime();
        return jwt.encode({ sub: user._id, iat: timestamp }, JWT_SECRET);
    },

    extractUserIdFromToken: function(token) {
        return jwt.decode(token, JWT_SECRET);
    }
};