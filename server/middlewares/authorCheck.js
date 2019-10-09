/* eslint-disable consistent-return */
/* eslint-disable radix */
import con from '../dbConnection';
import articles from '../models/articles';

class check {
  static async checkAuthor(req, res, next) {
    const findRegistedArticle = await con.query(articles.searchArticle, [req.params.id]);
    if (findRegistedArticle.rowCount === 1) {
      if (findRegistedArticle.rows[0].userid === req.user.id) {
        next();
      } else {
        return res.status(403).json({
          status: 403,
          error: 'only author of article has access',
        });
      }
    } else {
      return res.status(404).json({
        status: 404,
        error: 'article not found',
      });
    }
  }
}

export default check;
