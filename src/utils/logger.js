const winston = require('winston');

const transports = [];
const winstonTransports = winston.transports;
const consoleTransport = new winstonTransports.Console({
    colorize: true,
    format: winston.format.simple()
});

// Console
transports.push(consoleTransport);


const logger = winston.createLogger({ transports });

module.exports = logger;
