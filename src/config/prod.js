// prod.js - production keys here!!
module.exports = {
    mongoUser: process.env.MONGO_USER,
    mongoPassword: process.env.MONGO_PASSWORD,
    dbName: process.env.DB_NAME,
    jwtSecret: process.env.JWT_SECRET
};