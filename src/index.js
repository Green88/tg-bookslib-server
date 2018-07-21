import http from 'http';
import app from './app';

//server settings
const port = process.env.PORT || 3030;
const server = http.createServer(app);
server.listen(port);
console.log('Server listening on:', port);