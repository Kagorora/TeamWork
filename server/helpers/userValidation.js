/* eslint-disable no-unused-vars */
import Joi from 'joi';

const SignUpschema = Joi.object().keys({
  id: Joi.string().required(),
  firstName: Joi.string()
    .regex(/^[a-zA-Z]{3,30}$/)
    .required()
    .error(err => ({ message: 'Invalid firstName' })),
  lastName: Joi.string()
    .regex(/^[a-zA-Z]{3,30}$/)
    .required()
    .error(err => ({ message: 'Invalid lastName' })),
  email: Joi.string()
    .email()
    .required(),
  password: Joi.string()
    .regex(/^[a-zA-Z0-9 !@#$%^&*()_+./]{3,3000}$/)
    .required(),
  gender: Joi.string()
    .valid('male', 'female')
    .required(),
  isAdmin: Joi.boolean().required(),
});

const Loginschema = Joi.object().keys({
  email: Joi.string()
    .email()
    .required(),
  password: Joi.string()
    .regex(/^[a-zA-Z0-9 !@#$%^&*()_+./]{3,3000}$/)
    .required(),
});

export default {
  SignUpschema,
  Loginschema,
};
