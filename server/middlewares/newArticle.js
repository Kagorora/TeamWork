/* eslint-disable radix */
/* eslint-disable consistent-return */
import moment from 'moment';
import articleValidation from '../helpers/articleValidation';
import comments from '../models/comments';
import articles from '../models/articles';

class articleValidate {
  static article(req, res, next) {
    const ArticleResult = articleValidation.Articleschema.validate({
      title: req.body.title,
      article: req.body.article,
      category: (req.body.category).toLowerCase(),
      flag: 'normal',
      userId: req.user.id,
    });
    if (!ArticleResult.error) {
      req.article = ArticleResult;
      next();
    } else {
      const wrongInput = ArticleResult.error.details[0].message.replace('"', ' ').replace('"', '');
      return res.status(400).json({
        status: 400,
        error: wrongInput,
      });
    }
  }

  static edit(req, res, next) {
    const EditResult = articleValidation.EditSchema.validate({
      title: req.body.title,
      article: req.body.article,
      category: req.body.category,
    });

    if (!EditResult.error) {
      req.article = EditResult;
      next();
    } else {
      const wrongInput = EditResult.error.details[0].message.replace('"', ' ').replace('"', '');
      return res.status(400).json({
        status: 400,
        error: wrongInput,
      });
    }
  }

  static validateId(req, res, next) {
    const valideArticle = articleValidation.articleIdSchema.validate({
      id: parseInt(req.params.id),
    });

    if (!valideArticle.error) {
      req.article = valideArticle;
      next();
    } else {
      const wrongInput = valideArticle.error.details[0].message.replace('"', ' ').replace('"', '');
      return res.status(400).json({
        status: 400,
        error: wrongInput,
      });
    }
  }

  static comment(req, res, next) {
    const commentResult = articleValidation.CommentSchema.validate({
      comment: req.body.comment,
      flag: 'normal',
    });

    if (!commentResult.error) {
      req.comment = commentResult;
      next();
      return;
    }
    const wrongInput = commentResult.error.details[0].message.replace('"', ' ').replace('"', '');
    return res.status(400).json({
      status: 400,
      error: wrongInput,
    });
  }

  static validateCategory(req, res, next) {
    const categoryResult = articleValidation.validateCategory.validate({
      category: (req.params.category).toLowerCase(),
    });

    if (!categoryResult.error) {
      req.article = categoryResult;
      next();
    } else {
      const wrongInput = categoryResult.error.details[0].message.replace('"', ' ').replace('"', '');
      return res.status(400).json({
        status: 400,
        error: wrongInput,
      });
    }
  }
}

export default articleValidate;
