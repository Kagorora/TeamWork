import Joi from '@hapi/joi';

const Articleschema = Joi.object().keys({
  title: Joi.string().regex(/^[a-zA-Z0-9 '"!@#$%^*()_+./]{3,100}$/).required(),
  article: Joi.string().regex(/^[a-zA-Z0-9 ’!@#$%^&*()_+./]{3,3000}$/).required(),
  category: Joi.valid('technology', 'entertainment', 'social').required(),
  flag: Joi.string().required(),
  userId: Joi.number(),
});

const EditSchema = Joi.object().keys({
  title: Joi.string().regex(/^[a-zA-Z0-9 '"!@#$%^&*()_+./]{3,100}$/),
  article: Joi.string().regex(/^[a-zA-Z0-9 ’!@#$%^&*()_+./]{3,3000}$/),
  category: Joi.valid('technology', 'entertainment', 'social'),
});

const articleIdSchema = Joi.object().keys({
  id: Joi.number().required(),
});

// const articleIdSchema = id;
// v.isUUID(id)
// true
// v.isUUID('abc')
// false
// v.isNull(a)
// false

// const CommentSchema = Joi.object().keys({
//   articleId: Joi.number().min(1).max(9999999),
//   createdOn: Joi.required(),
//   commentId: Joi.number().required(),
//   comment: Joi.string().regex(/^[a-zA-Z ]{3,100}$/).required(),
//   tag: Joi.string().required(),
//   articleTitle: Joi.string().required(),
//   article: Joi.string().required(),
// });

// const findArticleSchema = Joi.object().keys({
//   id: Joi.string().required(),
// });

const validateCategory = Joi.object().keys({
  category: Joi.valid('technology', 'entertainment', 'social').required(),
});

// const findComment = Joi.object().keys({
//   id: Joi.string().required(),
// });

export default {
  Articleschema,
  EditSchema,
  articleIdSchema,
  //   CommentSchema,
  //   findArticleSchema,
  validateCategory,
  //   findComment,
};
