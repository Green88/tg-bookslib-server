const mongoose = require( 'mongoose');
const keys = require( './config');
const logger = require( './utils/logger');


mongoose.Promise = global.Promise;

const mongoConfig = {
    useMongoClient: true,
    config: {
        autoIndex: false
    }
};

function connect() {
    return new Promise((resolve, reject) => {
        mongoose
            .connect(keys.mongoUrl, mongoConfig)
            .then(connection => {
                logger.info(`Connected to mongo db`);
                connection.on('error', err => {
                    logger.error(err);
                    connection.close();
                });

                connection.on('disconnected', () => {
                    logger.info('Mongo disconnected');
                });

                return resolve(connection);
            })
            .catch(error => {
                logger.error(error);
                logger.info(
                    'There was a problem connecting mongoose to mongodb'
                );
                return reject(error);
            });
    });
}

module.exports = connect;