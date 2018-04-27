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
mongoose.connect(keys.mongoUrl);

mongodb://<dbuser>:<dbpassword>@ds159509.mlab.com:59509/bookslib-db-stage

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