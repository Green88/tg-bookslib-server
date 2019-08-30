const isEmpty = require('lodash/isEmpty');
const logger = require('../utils/logger');


function requestLogger({ method, params, query, body, url }, response, next) {
    let log = `${method} ${url}\n`;

    if (!isEmpty(query)) {
        log += `==> Have query parameters:\n${JSON.stringify(query)}\n`;
    }

    if (!isEmpty(body)) {
        log += `==> Have body parameters:\n${JSON.stringify(body)}\n`;
    }

    if (!isEmpty(params)) {
        log += `==> Have URI parameters:\n${JSON.stringify(params)}\n`;
    }

    logger.info(log);

    return next();
}

module.exports = requestLogger;
