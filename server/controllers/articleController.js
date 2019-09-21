/* eslint-disable radix */
import moment from 'moment';
import newArticle from '../helpers/new';
import articles from '../models/articles';
import findArticle from '../helpers/search';

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
}

export default articleController;
