// import 'dotenv/config';
import express from 'express';
import morgan from 'morgan';
import bodyParser from 'body-parser';
import http from 'http';
import mongoose from 'mongoose';
import cors from 'cors';
import keys from '../src/config';
import router from './router';

const app = express();

//Mongo settings
mongoose.connect(`mongodb://${keys.mongoUser}:${keys.mongoPassword}@ds259499.mlab.com:59499/${keys.dbName}`);

//App settings
app.use(morgan('combined'));
app.use(cors());
app.use(bodyParser.json({ type: '*/*' }));
router(app);

//server settings

const port = process.env.PORT || 3000;
const server = http.createServer(app);
server.listen(port);
console.log('Server listening on:', port);