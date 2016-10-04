/**
 * Created by Tania on 02/10/16.
 */
var _ = require('underscore');

/**
 * @typedef {{
 *  errorId: number,
 *  message: string,
 *  payload: Object
 * }}
 */
var RestResponse;

/**
 * @param {Object} res
 * @param {Object=} payload
 */
function ok(res, payload) {

    if (payload === undefined) {
        payload = null;
    }

    res.json({
        errorId: 0,
        message: 'ok',
        payload: payload
    });
}

/**
 * @param {Object} res
 * @param {string=} value
 */
function notModified(res, value) {
    res.status(304).json({
        errorId: 304,
        message: value + ' not found',
        payload: null
    });
}

/**
 * @param {Object} res
 * @param {string=} value
 */
function notFound(res, value) {
    res.status(404).json({
        errorId: 404,
        message: value + ' not found',
        payload: null
    });
}

/**
 * @param {Object} res
 */
function unauthorized(res) {
    res.status(401).json({
        errorId: 401,
        message: 'must authenticate',
        payload: null
    });
}

function redirect(res, status, url) {
    res.status(200).json({
        errorId: status,
        message: 'redirect',
        payload: url
    });
}


/**
 * @param {Object} res
 */
function forbidden(res) {
    res.status(403).json({
        errorId: 403,
        message: 'forbidden',
        payload: null
    });
}

/**
 * @param {Object} res
 * @param {Array.<string>=} invalidParams
 */
function badRequest(res, invalidParams) {
    logger.warn('bad request' + (invalidParams ? ' invalid params: ' + invalidParams.join(', ') : ''));
    res.status(400).json({
        errorId: 400,
        message: 'bad request' + (invalidParams ? ' invalid params: ' + invalidParams.join(', ') : ''),
        payload: null
    });
}

/**
 * @param {Object} res
 * @param {Array.<string>=} invalidParams
 * @param {number=} errorId
 */
function conflict(res, invalidParams, errorId) {
    res.status(409).json({
        errorId: errorId || 409,
        message: 'value already exists' + (invalidParams ? ': ' + invalidParams.join(', ') : ''),
        payload: null
    });
}

/**
 * @param {Object} res
 * @param {Error=} error
 */
function serverError(res, error) {
    if (_.isObject(error)) {
        logger.error(error);
    }
    res.status(500).json({
        errorId: 500,
        message: 'server error',
        payload: error ? error.message : null
    });
}

/**
 * @type {ok}
 */
exports.ok = ok;
/**
 * @type {notFound}
 */
exports.notFound = notFound;
/**
 * @type {notFound}
 */
exports.notModified = notModified;
/**
 * @type {unauthorized}
 */
exports.unauthorized = unauthorized;
/**
 * @type {forbidden}
 */
exports.forbidden = forbidden;
/**
 * @type {badRequest}
 */
exports.badRequest = badRequest;
/**
 * @type {serverError}
 */
exports.serverError = serverError;

/**
 * @type {redirect}
 */
exports.redirect = redirect;

/**
 * @type {redirect}
 */
exports.conflict = conflict;