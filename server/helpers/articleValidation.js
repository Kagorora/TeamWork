import Joi from '@hapi/joi';

const Articleschema = Joi.object().keys({
  title: Joi.string().regex(/^[a-zA-Z0-9 '"!@#$%^*()_+./]{3,100}$/).required(),
  article: Joi.string().regex(/^[a-zA-Z0-9 ’!@#$%^&*()_+./]{3,3000}$/).required(),
  category: Joi.valid('technology', 'entertainment', 'social').required(),
  flag: Joi.string().required(),
  userId: Joi.number(),
});

const EditSchema = Joi.object().keys({
  title: Joi.string().trim().regex(/^[a-zA-Z0-9 '"!@#$%^&*()_+./]{3,100}$/),
  article: Joi.string().trim().regex(/^[a-zA-Z0-9 ’!@#$%^&*()_+./]{3,3000}$/),
  category: Joi.valid('technology', 'entertainment', 'social'),
});

const articleIdSchema = Joi.object().keys({
  id: Joi.number().required(),
});

const CommentSchema = Joi.object().keys({
  comment: Joi.string().regex(/^[a-zA-Z '.?!()]{3,1000}$/)
    .required().error(err => ({ message: 'Invalid comment' })),
  flag: Joi.string(),
});

const validateCategory = Joi.object().keys({
  category: Joi.valid('technology', 'entertainment', 'social').required(),
});

export default {
  Articleschema,
  EditSchema,
  articleIdSchema,
  CommentSchema,
  validateCategory,
};
