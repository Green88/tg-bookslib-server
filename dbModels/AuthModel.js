
var mongoose = require('mongoose');
var bcrypt = require('bcrypt-nodejs');
var Schema = mongoose.Schema;

var authSchema = new Schema({
    email: { type: String, unique: true, lowercase: true },
    password: String,
    userId: String,
    permission: String
});

authSchema.pre('save', function(next) {
    // get access to the user model
    const user = this;

    // generate a salt then run callback
    bcrypt.genSalt(10, function(err, salt) {
        if (err) { return next(err); }

        // hash (encrypt) our password using the salt
        bcrypt.hash(user.password, salt, null, function(err, hash) {
            if (err) { return next(err); }

            // overwrite plain text password with encrypted password
            user.password = hash;
            next();
        });
    });
});

authSchema.methods.comparePassword = function(candidatePassword, callback) {
    bcrypt.compare(candidatePassword, this.password, function(err, isMatch) {
        if (err) { return callback(err); }

        callback(null, isMatch);
    });
};

// Create the model class
var AuthModel = mongoose.model('auth', authSchema);

// Export the model
module.exports = AuthModel;