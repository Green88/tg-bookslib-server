import Joi from 'joi';

export const validateUsernameTakenSchema = Joi.object().keys({
    username: Joi.string().alphanum().min(3).max(30).required()
});

export const signupSchema = Joi.object().keys({
    email: Joi.string().email().required(),
    username: Joi.string().alphanum().min(3).max(30).required(),
    password: Joi.string().regex(/^[a-zA-Z0-9]{3,30}$/).required()
});
