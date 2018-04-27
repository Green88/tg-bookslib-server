import Book from './book-model';
import RestResponse from '../utils/rest/RestResponse';

/**
 * @param {App} app
 */
module.exports = function(app) {
    app.get('/books', getAllBooks);

    app.get('/books/:bookId', getBookById);

    app.post('/book', saveBookToDB);
};

function getAllBooks(req, res) {
    Book.find({}, function(error, result) {
        if(error) {
            RestResponse.serverError(res, error);
            return;
        }

        RestResponse.ok(res, result);
    });
}

function getBookById(req, res) {
    Book.findOne({bookId: req.params.bookId}, function(error, result) {
        if(error) {
            RestResponse.serverError(res, error);
            return;
        }

        RestResponse.ok(res, result);
    });
}

function saveBookToDB(req, res) {
    const book = new Book({
        bookId: req.body.bookId,
        title: req.body.title,
        description: req.body.description,
        imageUrls: req.body.imageUrls,
        text: req.body.text,
        genre: req.body.genre,
        finished: req.body.finished,
        rating: req.body.rating,
        author: {
            authorId: req.body.authorId,
            name: req.body.authorName,
            imageUrl: req.body.authorImageUrl
        }
    });


    book.save(function(error, book) {
        if (error) {
            RestResponse.serverError(res, error);
            return;
        }

        RestResponse.ok(res, book);
    });
}