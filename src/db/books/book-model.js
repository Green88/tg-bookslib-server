import mongoose, { Schema } from 'mongoose';
import { id, defaultSchemaOptions} from "../../constants";

const bookSchema = new Schema({
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
export default Book;
