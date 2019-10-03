/* eslint-disable radix */
/* eslint-disable consistent-return */
import moment from 'moment';
import articles from '../models/articles';
import articleValidation from '../helpers/articleValidation';
import comments from '../models/comments';

class articleValidate {
  static article(req, res, next) {
    const result = articleValidation.Articleschema.validate({
      id: articles.length + 1,
      title: req.body.title,
      article: req.body.article,
      createdOn: moment().format('YYYY-MM-DD'),
      category: req.body.category,
      tag: 'normal',
    });
    if (!result.error) {
      req.article = result;
      next();
    } else {
      const wrongInput = result.error.details[0].message.replace('"', ' ').replace('"', '');
      return res.status(400).json({
        status: 400,
        error: wrongInput,
      });
    }
  }

  static edit(req, res, next) {
    const result = articleValidation.EditSchema.validate({
      title: req.body.title,
      article: req.body.article,
    });

    if (!result.error) {
      req.article = result;
      next();
    } else {
      const wrongInput = result.error.details[0].message.replace('"', ' ').replace('"', '');
      return res.status(400).json({
        status: 400,
        error: wrongInput,
      });
    }
  }

  static delete(req, res, next) {
    const result = articleValidation.articleIdSchema.validate({
      id: req.params.id,
    });

    if (!result.error) {
      req.article = result;
      next();
    } else {
      const wrongInput = result.error.details[0].message.replace('"', ' ').replace('"', '');
      return res.status(400).json({
        status: 400,
        error: wrongInput,
      });
    }
  }

  static comment(req, res, next) {
    const foundArticle = articles.find(a => a.id === parseInt(req.params.id));
    if (foundArticle) {
      const result = articleValidation.CommentSchema.validate({
        createdOn: moment().format,
        commentId: comments.length + 1,
        articleTitle: foundArticle.title,
        article: foundArticle.article,
        comment: req.body.comment,
        tag: 'normal',
      });

      if (!result.error) {
        req.comment = result;
        next();
        return;
      }
      const wrongInput = result.error.details[0].message.replace('"', ' ').replace('"', '');
      return res.status(400).json({
        status: 400,
        error: wrongInput,
      });
    }
    return res.status(404).json({
      status: 404,
      error: 'article not found',
    });
  }

  static findArticle(req, res, next) {
    const result = articleValidation.findArticleSchema.validate({
      id: req.params.id,
    });
    if (!result.error) {
      req.article = result;
      next();
    } else {
      const wrongInput = result.error.details[0].message.replace('"', ' ').replace('"', '');
      return res.status(400).json({
        status: 400,
        error: wrongInput,
      });
    }
  }

  static findByCategory(req, res, next) {
    const result = articleValidation.findByCategory.validate({
      category: req.params.category,
    });

    if (!result.error) {
      req.article = result;
      next();
    } else {
      const wrongInput = result.error.details[0].message.replace('"', ' ').replace('"', '');
      return res.status(400).json({
        status: 400,
        error: wrongInput,
      });
    }
  }

  static findComment(req, res, next) {
    const result = articleValidation.findComment.validate({
      commentId: req.params.id,
    });

    if (!result.error) {
      req.article = result;
      next();
    } else {
      const wrongInput = result.error.details[0].message.replace('"', ' ').replace('"', '');
      return res.status(400).json({
        status: 400,
        error: wrongInput,
      });
    }
  }
}

export default articleValidate;
