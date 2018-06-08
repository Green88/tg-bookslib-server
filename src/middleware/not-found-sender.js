import RestResponse from '../utils/rest/RestResponse';

function sendNotFound(request, response, next) {
    return next(RestResponse.pageNotFound(request, response));
}

export default sendNotFound;