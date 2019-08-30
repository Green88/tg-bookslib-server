const RestResponse = require('../utils/rest/RestResponse');

function sendNotFound(request, response, next) {
    return next(RestResponse.pageNotFound(request, response));
}

module.exports = sendNotFound;