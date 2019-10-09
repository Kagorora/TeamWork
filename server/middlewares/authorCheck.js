import con from '../dbConnection';
import articles from '../models/articles';

class check {
  static async checkAuthor(req, res, next) {
    const findRegistedArticle = await con.query(articles.searchArticle, [req.params.id]);
    const authorId = req.user.id;
    if (findRegistedArticle.rows[0].userid === authorId) {
      next();
    }
    return res.status.json({
      status: 403,
      error: 'only author of article has access',
    });
  }
}

export default check;
