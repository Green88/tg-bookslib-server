import booksRoutes from './books/books-routes';
import authRoutes from './auth/auth-routes';
import profileRoutes from './users/users-routes';

module.exports = function(app) {
    booksRoutes(app);
    authRoutes(app);
    profileRoutes(app);
};
