const http = require('http');
const app = require('./app');

//server settings
const port = process.env.PORT || 3030;
const server = http.createServer(app);
server.listen(port);
console.log('Server listening on:', port);