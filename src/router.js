import booksRoutes from './db/books/books-routes';
import authRoutes from './db/auth/auth-routes';
import usersRoutes from './db/users/users-routes';

export default (app) => {
    booksRoutes(app);
    authRoutes(app);
    usersRoutes(app);
};
