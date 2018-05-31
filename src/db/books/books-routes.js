import Book from './book-model';
import RestResponse from '../../utils/rest/RestResponse';

/**
 * @param {App} app
 */
export default app => {
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