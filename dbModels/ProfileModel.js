/**
 * Created by Tania on 08/08/16.
 */
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var BookModel = require('./BookModel');

var profileSchema = new Schema({
    userId: String,
    name: String,
    bio: String,
    imageUrl: String,
    isAuthor: Boolean,
    books: [BookModel]
});


// Create the model class
var ProfileModel = mongoose.model('profile', profileSchema);

// Export the model
module.exports = ProfileModel;