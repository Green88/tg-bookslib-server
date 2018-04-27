import mongoose, { Schema } from 'mongoose';

const userSchema = new Schema({
    userId: Schema.Types.ObjectId,
    username: String,
    name: String,
    bio: String,
    imageUrl: String,
    isAuthor: Boolean
});


// Create the model class
const User = mongoose.model('profile', userSchema);

export default User;