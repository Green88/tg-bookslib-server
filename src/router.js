const booksRoutes = require( './db/books/books-routes');
const authRoutes = require( './db/auth/auth-routes');
const usersRoutes = require( './db/users/users-routes');

module.exports = app => {
    booksRoutes(app);
    authRoutes(app);
    usersRoutes(app);
};
