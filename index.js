/**
 * Created by Tania on 07/08/16.
 */
var express = require('express');
var morgan = require('morgan');
var bodyParser = require('body-parser');
var http = require('http');
var router = require('./router');
var mongoose = require('mongoose');

var app = express();

//Mongo settings
mongoose.connect('mongodb://taniatest:taniatest@ds145355.mlab.com:45355/bookslib_db');

//App settings

app.use(morgan('combined'));
//app.use(cors());
app.use(bodyParser.json({ type: '*/*' }));
router(app);

//server settings

const port = process.env.PORT || 3090;
const server = http.createServer(app);
server.listen(port);
console.log('Server listening on:', port);