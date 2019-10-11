
/* eslint-disable max-len */
/* eslint-disable radix */
import articles from '../models/articles';
import con from '../dbConnection';

class articleController {
  static async createArticle(req, res) {
    const {
      title,
      article,
      category,
      flag,
      userId,
    } = req.article.value;

    const findArticle = await con.query(articles.findByTitle, [title]);
    if (findArticle.rowCount !== 0) {
      return res.status(409).json({
        status: 409,
        error: `article with title : ${title} exists`,
      });
    }
    const registeredArticle = await con.query(articles.addArticle, [
      title,
      article,
      category.toLowerCase(),
      flag,
      userId,
    ]);

    return res.status(201).json({
      status: 201,
      message: 'article successfuly created',
      data: registeredArticle.rows[0],
    });
  }

  static async editArticle(req, res) {
    const desiredArticle = await con.query(articles.searchArticle, [req.params.id]);
    if (desiredArticle.rowCount === 0) {
      return res.status(404).json({
        status: 404,
        error: 'article not found',
      });
    }
    const {
      title, article, category,
    } = req.body;

    await con.query(articles.updateArticle, [
      title,
      article,
      category,
      desiredArticle.rows[0].id,
    ]);
    const newUpdatedArticle = await con.query(articles.searchArticle, [req.params.id]);
    if (
      desiredArticle.rows[0].title === title && desiredArticle.rows[0].category === category && desiredArticle.rows[0].category === category
    ) {
      return res.status(304).json({
        status: 304,
        error: 'nothing to change',
      });
    }
    return res.status(200).json({
      status: 200,
      message: 'article updated successfully',
      data: newUpdatedArticle.rows[0],
    });
  }

  static async deleteArticle(req, res) {
    const foundArticle = await con.query(articles.searchArticle, [parseInt(req.params.id)]);
    if (foundArticle.rowCount === 0) {
      return res.status(404).json({
        status: 404,
        error: 'article not found',
      });
    }
    await con.query(articles.removeArticle, [parseInt(req.params.id)]);
    return res.status(204).json({
      status: 204,
      message: 'article successfully deleted',
    });
  }

  static async viewAllArticles(req, res) {
    const allArticles = await con.query(articles.findAllArticles);
    if (allArticles.rowCount === 0) {
      return res.status(404).json({
        status: 404,
        error: 'no article found',
      });
    }
    return res.status(200).json({
      status: 200,
      data: allArticles.rows,
    });
  }

  static async findArticle(req, res) {
    const foundArticle = await con.query(articles.searchArticle, [parseInt(req.params.id)]);
    if (foundArticle.rowCount === 0) {
      return res.status(404).json({
        status: 404,
        error: 'article not found',
      });
    }

    return res.status(200).json({
      status: 200,
      message: foundArticle.rows[0],
    });
  }

  static async viewByCategories(req, res) {
    const articleCategory = (req.params.category).toLowerCase();
    const desiredArticle = await con.query(articles.searchAByCategory, [articleCategory]);
    if (desiredArticle.rowCount === 0) {
      return res.status(404).json({
        status: 404,
        error: 'article not found',
      });
    }
    return res.status(200).json({
      status: 200,
      message: 'articles found',
      data: desiredArticle.rows,
    });
  }

  static async FlagArticle(req, res) {
    const desiredArticle = await con.query(articles.FlagArticle, ['inappropriate', parseInt(req.params.id)]);
    if (desiredArticle.rowCount === 0) {
      return res.status(404).json({
        status: 404,
        error: 'article not found',
      });
    }
    return res.status(200).json({
      status: 200,
      message: 'marked as inappropriate',
      data: desiredArticle.rows[0],
    });
  }
}


export default articleController;
