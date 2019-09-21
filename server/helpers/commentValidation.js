import Joi from '@hapi/joi';

const schema = Joi.object().keys({
  createdOn: Joi.string().required(),
  commentId: Joi.number().required(),
  articleTitle: Joi.string().required(),
  article: Joi.string().required(),
  comment: Joi.string().required(),
  flag: Joi.string().required(),
});

export default schema;
