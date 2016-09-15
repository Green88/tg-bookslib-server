/**
 * Created by Tania on 07/08/16.
 */

var booksRoutes = require('./routes/books');
var authRoutes = require('./routes/auth');

module.exports = function(app) {
    booksRoutes(app);
    authRoutes(app);
};
