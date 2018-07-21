import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import passport from 'passport';
import router from './router';
import errorSend from './middleware/error-send';
import sendNotFound from './middleware/not-found-sender';
import requestLogger from './middleware/request-logger';
import connectToMongo from './mongoDb';

const app = express();

if(process.env.NODE_ENV !== 'test') {
    connectToMongo();
}

//App settings
app.use(cors());
app.use(bodyParser.json({ type: '*/*' }));
app.use(passport.initialize());
app.use(passport.session());
app.use(requestLogger);
router(app);
app.use(sendNotFound);
app.use(errorSend);

export default app;