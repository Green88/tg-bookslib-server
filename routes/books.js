
var Book = require('../dbModels/BookModel').BookModel;
var uuid = require('node-uuid');

/**
 * @param {App} app
 */
module.exports = function(app) {
    app.get('/books', getAllBooks);

    app.get('/books/:bookId', getBookById);

    app.post('/book', saveBookToDB);
};

function getAllBooks(req, res, next) {
    Book.find({}, function(err, result) {
        if(err) {
            console.log(err);
            return next(err);
        }

        res.send({result: 'ok', data: result});
    });
}

function getBookById(req, res, next) {
    Book.findOne({bookId: req.params.bookId}, function(err, result) {
        if(err) {
            console.log(err);
            return next(err);
        }

        res.send({result: 'ok', data: result});
    });
}

function saveBookToDB(req, res, next) {
    var book = new Book({
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


    book.save(function(err) {
        if (err) {
            console.log(err);
            return next(err);
        }

        // Repond to request indicating the book was created
        res.json({ data: book});
    });
}