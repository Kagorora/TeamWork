/* eslint-disable radix */
/* eslint-disable consistent-return */
import moment from 'moment';
import uuid from 'uuid';
import articles from '../models/articles';
import articleValidation from '../helpers/articleValidation';
import comments from '../models/comments';

class articleValidate {
  static article(req, res, next) {
    const ArticleResult = articleValidation.Articleschema.validate({
      id: uuid(),
      title: req.body.title,
      article: req.body.article,
      createdOn: moment().format('YYYY-MM-DD'),
      category: req.body.category,
      flag: 'normal',
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
      id: req.params.id,
      title: req.body.title,
      article: req.body.article,
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

  static delete(req, res, next) {
    const deleteResult = articleValidation.articleIdSchema.validate({
      id: req.params.id,
    });

    if (!deleteResult.error) {
      req.article = deleteResult;
      next();
    } else {
      const wrongInput = deleteResult.error.details[0].message.replace('"', ' ').replace('"', '');
      return res.status(400).json({
        status: 400,
        error: wrongInput,
      });
    }
  }

  static comment(req, res, next) {
    const foundArticle = articles.find(a => a.id === parseInt(req.params.id));
    if (foundArticle) {
      const commentResult = articleValidation.CommentSchema.validate({
        createdOn: moment().format,
        commentId: comments.length + 1,
        articleTitle: foundArticle.title,
        article: foundArticle.article,
        comment: req.body.comment,
        tag: 'normal',
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
    return res.status(404).json({
      status: 404,
      error: 'article not found',
    });
  }

  static findArticle(req, res, next) {
    const articleResult = articleValidation.findArticleSchema.validate({
      id: req.params.id,
    });
    if (!articleResult.error) {
      req.article = articleResult;
      next();
    } else {
      const wrongInput = articleResult.error.details[0].message.replace('"', ' ').replace('"', '');
      return res.status(400).json({
        status: 400,
        error: wrongInput,
      });
    }
  }

  static findByCategory(req, res, next) {
    const categoryResult = articleValidation.findByCategory.validate({
      category: req.params.category,
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

  static findComment(req, res, next) {
    const comemenResult = articleValidation.findComment.validate({
      commentId: req.params.id,
    });

    if (!comemenResult.error) {
      req.article = comemenResult;
      next();
    } else {
      const wrongInput = comemenResult.error.details[0].message.replace('"', ' ').replace('"', '');
      return res.status(400).json({
        status: 400,
        error: wrongInput,
      });
    }
  }
}

export default articleValidate;
