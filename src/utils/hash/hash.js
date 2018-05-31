import bcrypt from 'bcrypt-nodejs';

module.exports = {
    hashPassword: async (password) => {
        const salt = await new Promise((resolve, reject) => {
            bcrypt.genSalt(10, function(err, result) {
                if (err)  { reject(err); }
                resolve(result);
            });
        });
        return new Promise((resolve, reject) => {
            bcrypt.hash(password, salt, null, function(err, hash) {
                if (err) { reject(err); }
                resolve(hash);
            });
        });
    },

    comparePassword: async (candidatePassword, hash) =>
        new Promise((resolve, reject) => {
            bcrypt.compare(candidatePassword, hash, function(err, isMatch) {
                if (err) { reject(err); }
                resolve(isMatch);
            });
        })
};