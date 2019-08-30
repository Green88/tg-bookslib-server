const Joi = require('joi');

module.exports = (obj, schema) => Joi.validate(obj, schema);