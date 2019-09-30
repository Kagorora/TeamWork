import Joi from '@hapi/joi';

const schema = Joi.object().keys({
  id: Joi.number().required(),
  title: Joi.string().regex(/^[a-zA-Z0-9 '"!@#$%^&*()_+./]{3,100}$/).required(),
  article: Joi.string().regex(/^[a-zA-Z0-9 ’!@#$%^&*()_+./]{3,3000}$/).required(),
  createdOn: Joi.string().required(),
  category: Joi.valid('Technology', 'Entertainment', 'Social').required(),
  tag: Joi.string().required(),
});

export default schema;
