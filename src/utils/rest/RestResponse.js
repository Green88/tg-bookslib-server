import _ from 'underscore';

//TODO: set up normal logger

export default class RestResponse {
    static ok(res, payload) {

        if (payload === undefined) {
            payload = null;
        }

        res.json({
            errorId: 0,
            message: 'ok',
            payload: payload
        });
    }

    static notModified(res, value) {
        res.status(304).json({
            errorId: 304,
            message: value + ' not found',
            payload: null
        });
    }

    static notFound(res, value) {
        res.status(404).json({
            errorId: 404,
            message: value + ' not found',
            payload: null
        });
    }

    static unauthorized(res) {
        res.status(401).json({
            errorId: 401,
            message: 'must authenticate',
            payload: null
        });
    }

    static redirect(res, status, url) {
        res.status(200).json({
            errorId: status,
            message: 'redirect',
            payload: url
        });
    }

    static forbidden(res) {
        res.status(403).json({
            errorId: 403,
            message: 'forbidden',
            payload: null
        });
    }

    static badRequest(res, invalidParams) {
        //logger.warn('bad request' + (invalidParams ? ' invalid params: ' + invalidParams.join(', ') : ''));
        console.error('bad request' + (invalidParams ? ' invalid params: ' + invalidParams.join(', ') : ''));
        res.status(400).json({
            errorId: 400,
            message: 'bad request' + (invalidParams ? ' invalid params: ' + invalidParams.join(', ') : ''),
            payload: null
        });
    }

    static conflict(res, invalidParams, errorId) {
        res.status(409).json({
            errorId: errorId || 409,
            message: 'value already exists' + (invalidParams ? ': ' + invalidParams.join(', ') : ''),
            payload: null
        });
    }

    static serverError(res, error) {
        if (_.isObject(error)) {
            //logger.error(error);
            console.error(error);
        }
        res.status(500).json({
            errorId: 500,
            message: 'server error',
            payload: error ? error.message : null
        });
    }
}