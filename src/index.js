import express from 'express';
import morgan from 'morgan';
import bodyParser from 'body-parser';
import http from 'http';
import mongoose from 'mongoose';
import cors from 'cors';
import passport from 'passport';
import keys from '../src/config';
import router from './router';
import errorSend from './middleware/error-send';
import sendNotFound from './middleware/not-found-sender';

const app = express();

//Mongo settings
mongoose.Promise = global.Promise;
const mongoConfig = {
    useMongoClient: true,
    config: {
        autoIndex: false
    }
};
mongoose.connect(keys.mongoUrl, mongoConfig);

//App settings
app.use(morgan('combined'));
app.use(cors());
app.use(bodyParser.json({ type: '*/*' }));
app.use(passport.initialize());
app.use(passport.session());
router(app);
app.use(sendNotFound);
app.use(errorSend);

//server settings

const port = process.env.PORT || 3030;
const server = http.createServer(app);
server.listen(port);
console.log('Server listening on:', port);