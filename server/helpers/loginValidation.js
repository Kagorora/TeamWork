import Joi from 'joi';

const loginSchema = Joi.object().keys({
  email: Joi.string().email().required(),
  password: Joi.string().min(3).required(),
});
export default loginSchema;
