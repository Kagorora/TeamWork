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
}

export default articleController;
