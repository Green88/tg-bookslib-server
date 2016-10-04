/**
 * Created by Tania on 08/08/16.
 */
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var bookSchema = new Schema({
    title: String,
    description: String,
    imageUrls: [String],
    text: String,
    genre: String,
    finished: Boolean,
    rating: Number,
    author: {
        authorId: Schema.Types.ObjectId,
        name: String,
        imageUrl: String
    }
});


// Create the model class
var BookModel = mongoose.model('book', bookSchema);

// Export the model
module.exports = BookModel;
