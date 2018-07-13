import mongoose, { Schema } from 'mongoose';
import { id, defaultSchemaOptions} from "../../constants";

const userSchema = new Schema({
    id,
    email: { type: String, unique: true, lowercase: true },
    username: {type: String, unique: true, lowercase: true},
    password: String,
    permission: String,
    name: String,
    bio: String,
    imageUrl: String,
    isAuthor: Boolean
}, defaultSchemaOptions);

// Create the model class
const User = mongoose.model('user', userSchema);

export default User;