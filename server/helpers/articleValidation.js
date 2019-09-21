import Joi from '@hapi/joi';

const schema = Joi.object().keys({
  id: Joi.number().required(),
  title: Joi.string().required(),
  article: Joi.string().required(),
  createdOn: Joi.string().required(),
  category: Joi.string().required(),
});

export default schema;
