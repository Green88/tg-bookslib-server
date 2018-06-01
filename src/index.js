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

const app = express();

//Mongo settings
mongoose.Promise = global.Promise;
mongoose.connect(keys.mongoUrl, { useMongoClient: true });

//App settings
app.use(morgan('combined'));
app.use(cors());
app.use(bodyParser.json({ type: '*/*' }));
app.use(passport.initialize());
app.use(passport.session());
router(app);
app.use(errorSend);

//server settings

const port = process.env.PORT || 3000;
const server = http.createServer(app);
server.listen(port);
console.log('Server listening on:', port);