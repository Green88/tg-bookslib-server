const mongoose = require('mongoose');
const { id, defaultSchemaOptions} = require('../../constants');

const bookSchema = mongoose.Schema({
    id,
    title: String,
    description: String,
    imageUrls: [String],
    text: String,
    genre: String,
    finished: Boolean,
    rating: Number,
    authorId: String
}, defaultSchemaOptions);


// Create the model class
const Book = mongoose.model('book', bookSchema);

// Export the model
module.exports = Book;
