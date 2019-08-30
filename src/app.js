const express = require( 'express');
const bodyParser = require( 'body-parser');
const cors = require( 'cors');
const passport = require( 'passport');
const router = require( './router');
const errorSend = require( './middleware/error-send');
const responseExtender = require( './middleware/response-extender');
const sendNotFound = require( './middleware/not-found-sender');
const requestLogger = require( './middleware/request-logger');
const connectToMongo = require( './mongoDb');

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
app.use(responseExtender);

router(app);

app.use(sendNotFound);
app.use(errorSend);

module.exports = app;