import Joi from 'joi';

export default (obj, schema) => Joi.validate(obj, schema);