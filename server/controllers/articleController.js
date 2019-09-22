/* eslint-disable radix */
import moment from 'moment';
import newArticle from '../helpers/new';
import articles from '../models/articles';
import findArticle from '../helpers/search';
import comments from '../models/comments';
import commentValidation from '../helpers/commentValidation';

class articleController {
  static createArticle(req, res) {
    if (!newArticle.newA(req).error) {
      const article = newArticle.newA(req).value;
      const foundArticle = findArticle.searchArt(article.title);
      if (!foundArticle) {
        articles.push(article);
        return res.status(201).json({
          status: 201,
          data: article,
        });
      }
      return res.status(401).json({
        status: 401,
        error: 'article exists',
      });
    }
    const wrongInput = newArticle.newA(req).error.details[0].message.replace('"', ' ').replace('"', '');
    return res.status(400).json({
      status: 400,
      error: wrongInput,
    });
  }

  static editArticle(req, res) {
    const articId = parseInt(req.params.id);
    const desiredArticle = findArticle.searchArtById(articId);
    if (!desiredArticle) {
      return res.status(404).json({
        status: 404,
        error: 'article not found',
      });
    }
    const {
      title, article, category,
    } = req.body;

    if (desiredArticle.title === title && desiredArticle.article === article) {
      return res.status(401).json({
        status: 401,
        error: 'nothing to change',
      });
    }
    desiredArticle.createdOn = moment().format('YYYY-MM-DD');
    desiredArticle.title = title;
    desiredArticle.article = article;
    desiredArticle.category = category;
    return res.status(200).json({
      status: 200,
      data: desiredArticle,
    });
  }

  static deleteArticle(req, res) {
    const articleId = parseInt(req.params.id);
    const foundArticle = findArticle.searchArtById(articleId);
    if (!foundArticle) {
      return res.status(404).json({
        status: 404,
        error: 'article not found',
      });
    }
    const unwantedArticle = articles.indexOf(foundArticle);
    articles.splice(unwantedArticle, 1);
    return res.status(200).json({
      status: 200,
      message: 'article successfully deleted',
      data: articles,
    });
  }

  static createComments(req, res) {
    const foundArticle = findArticle.searchArtById(parseInt(req.params.id));
    if (foundArticle) {
      const newComment = commentValidation.validate({
        createdOn: foundArticle.createdOn,
        commentId: comments.length + 1,
        articleTitle: foundArticle.title,
        article: foundArticle.article,
        comment: req.body.comment,
        flag: 'normal',
      });
      if (!newComment.error) {
        comments.push(newComment.value);
        return res.status(201).json({
          status: 201,
          data: newComment.value,
        });
      }
      const wrongInput = newComment.error.details[0].message.replace('"', ' ').replace('"', '');
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

  static viewAllArticles(req, res) {
    const arrayLength = articles.length;
    if (arrayLength === 0) {
      return res.status(404).json({
        status: 404,
        error: 'no article found',
      });
    }
    articles.reverse();
    return res.status(404).json({
      status: 200,
      data: articles,
    });
  }

  static findArticle(req, res) {
    const desiredArticle = findArticle.searchArtById(parseInt(req.params.id));
    if (!desiredArticle) {
      return res.status(404).json({
        status: 404,
        error: 'article not found',
      });
    }
    return res.status(200).json({
      status: 200,
      message: 'article found',
      data: desiredArticle,
    });
  }

  static viewByCategories(req, res) {
    const { category } = req.params;
    const desiredArticle = findArticle.searchByCategory(category);
    if (desiredArticle.length === 0) {
      return res.status(404).json({
        status: 404,
        error: 'article not found',
      });
    }
    return res.status(200).json({
      status: 200,
      message: 'articles found',
      data: desiredArticle,
    });
  }
}

export default articleController;
