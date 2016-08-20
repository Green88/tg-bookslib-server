/**
 * Created by Tania on 07/08/16.
 */

var booksRoutes = require('./routes/books');

module.exports = function(app) {
    booksRoutes(app);
};
