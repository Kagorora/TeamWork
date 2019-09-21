/* eslint-disable no-unused-vars */
import Joi from '@hapi/joi';

const schema = Joi.object().keys({
  id: Joi.number().required(),
  token: [Joi.string(), Joi.number()
    .required()],
  firstName: Joi.string().regex(/^[a-zA-Z]{3,30}$/)
    .required().error(err => ({ message: 'Invalid firstName' })),
  lastName: Joi.string().regex(/^[a-zA-Z]{3,30}$/)
    .required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(3).max(100)
    .required(),
  gender: Joi.string().valid('male', 'female')
    .required(),
  jobRole: Joi.string().regex(/^[a-zA-Z ]{3,30}$/)
    .required(),
  address: Joi.string().alphanum().min(3).required(),
  departement: Joi.string().regex(/^[a-zA-Z ]{2,30}$/)
    .required(),
  isAdmin: Joi.boolean().required(),
});

export default schema;
