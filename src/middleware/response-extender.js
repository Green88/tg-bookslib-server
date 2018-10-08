import HTTP_STATUS_CODES from 'http-status-codes';

const errorResponseModel = ({ name, status, message, details }) => ({
    status: status || HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR,
    name,
    message,
    details
});

function addError(response) {
    response.error =
        response.error ||
        (error => response.status(error.status || 500).json(errorResponseModel(error)));
}

function extendResponse(request, response, next) {
    addError(response);
    next();
}

export default extendResponse;


