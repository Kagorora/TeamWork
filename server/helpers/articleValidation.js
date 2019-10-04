import Joi from '@hapi/joi';

const Articleschema = Joi.object().keys({
  id: Joi.number().min(1).max(9999999).required(),
  title: Joi.string().regex(/^[a-zA-Z0-9 '"!@#$%^*()_+./]{3,100}$/).required(),
  article: Joi.string().regex(/^[a-zA-Z0-9 ’!@#$%^&*()_+./]{3,3000}$/).required(),
  createdOn: Joi.string().required(),
  category: Joi.valid('Technology', 'Entertainment', 'Social').required(),
  tag: Joi.string().required(),
});

const EditSchema = Joi.object().keys({
  id: Joi.number().min(1).max(9999999),
  title: Joi.string().regex(/^[a-zA-Z0-9 '"!@#$%^&*()_+./]{3,100}$/).required(),
  article: Joi.string().regex(/^[a-zA-Z0-9 ’!@#$%^&*()_+./]{3,3000}$/).required(),
});

const articleIdSchema = Joi.object().keys({
  id: Joi.number().min(1).max(9999999).required(),
});

const CommentSchema = Joi.object().keys({
  articleId: Joi.number().min(1).max(9999999),
  createdOn: Joi.required(),
  commentId: Joi.number().required(),
  comment: Joi.string().regex(/^[a-zA-Z ]{3,100}$/).required(),
  tag: Joi.string().required(),
  articleTitle: Joi.string().required(),
  article: Joi.string().required(),
});

const findArticleSchema = Joi.object().keys({
  id: Joi.number().min(1).max(9999999).required(),
});

const findByCategory = Joi.object().keys({
  category: Joi.valid('Technology', 'Entertainment', 'Social').required(),
});

const findComment = Joi.object().keys({
  commentId: Joi.number().min(1).max(9999999).required(),
});

export default {
  Articleschema,
  EditSchema,
  articleIdSchema,
  CommentSchema,
  findArticleSchema,
  findByCategory,
  findComment,
};
