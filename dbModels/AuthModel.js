
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var authSchema = new Schema({
    email: String,
    password: String,
    userId: String,
    permission: String
});


// Create the model class
var AuthModel = mongoose.model('auth', authSchema);

// Export the model
module.exports = AuthModel;