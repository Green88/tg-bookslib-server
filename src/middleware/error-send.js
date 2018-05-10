/* eslint-disable no-param-reassign */

import HTTP_STATUS_CODE from 'http-status-codes';

const errorMapper = (error, request) => {
    error.data = request.data || {};
    error.data.url = request.url;

    // In case if error was built correctly
    if (error.status) {
        console.error(error);
        return error;
    }

    switch (error.name) {
        case 'ValidationError':
            error.status = HTTP_STATUS_CODE.INTERNAL_SERVER_ERROR;
            error.details = error.errors;
            break;

        case 'RequestValidationError':
            error.status = HTTP_STATUS_CODE.BAD_REQUEST;
            break;

        default:
            error.status = HTTP_STATUS_CODE.INTERNAL_SERVER_ERROR;
            error.name = 'InternalServerError';
            break;
    }

    console.error(error);

    return error;
};

function errorSender(error, request, response, next) {
    return response.error(errorMapper(error, request), next);
}

export default errorSender;
