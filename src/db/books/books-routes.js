const Book = require('./book-model');
const RestResponse = require('../../utils/rest/RestResponse');

/**
 * @param {App} app
 */
module.exports = app => {
    app.get('/books', getAllBooks);

    app.get('/books/:bookId', getBookById);

    app.post('/books', createBook);
};

const getAllBooks = async (req, res) => {
    const book = await Book.find({});
    RestResponse.ok(res, book);
};

const getBookById = async (req, res) => {
    const book = await Book.findOne({bookId: req.params.bookId});
    RestResponse.ok(res, book);
};

const createBook = async (req, res) => {
    const book = new Book({
        bookId: req.body.bookId,
        title: req.body.title,
        description: req.body.description,
        imageUrls: req.body.imageUrls,
        text: req.body.text,
        genre: req.body.genre,
        finished: req.body.finished,
        rating: req.body.rating,
        authorId: req.body.authorId
    });

    const created = await book.save();
    RestResponse.ok(res, created);
};