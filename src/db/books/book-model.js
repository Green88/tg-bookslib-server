import mongoose, { Schema } from 'mongoose';

const bookSchema = new Schema({
    title: String,
    description: String,
    imageUrls: [String],
    text: String,
    genre: String,
    finished: Boolean,
    rating: Number,
    authorId: String
});


// Create the model class
const Book = mongoose.model('book', bookSchema);

// Export the model
export default Book;
