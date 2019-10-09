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

    const registeredArticle = await con.query(articles.addArticle, [
      title,
      article,
      category,
      flag,
      userId,
    ]);
    if (registeredArticle.rowCount === 1) {
      return res.status(201).json({
        status: 201,
        message: 'article successfuly created',
        data: registeredArticle.rows[0],
      });
    }
    return res.status(409).json({
      status: 409,
      error: `article with title : ${title} exists`,
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

  //   static createComments(req, res) {
  //     comments.push(req.comment.value);
  //     return res.status(201).json({
  //       status: 201,
  //       data: req.comment.value,
  //     });
  //   }

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

  //   static viewByCategories(req, res) {
  //     const desiredArticle = find.searchByCategory(req.article.value.category);
  //     if (desiredArticle.length === 0) {
  //       return res.status(404).json({
  //         status: 404,
  //         error: 'article not found',
  //       });
  //     }
  //     return res.status(200).json({
  //       status: 200,
  //       message: 'articles found',
  //       data: desiredArticle,
  //     });
  //   }

  //   static FlagArticle(req, res) {
  //     const desiredArticle = find.searchArtById(parseInt(req.params.id));
  //     if (!desiredArticle) {
  //       return res.status(404).json({
  //         status: 404,
  //         error: 'article not found',
  //       });
  //     }
  //     const unwantedArticleIndex = articles.indexOf(desiredArticle);
  //     articles[unwantedArticleIndex].tag = 'inappropriate';
  //     return res.status(200).json({
  //       status: 200,
  //       message: 'marked as inappropriate',
  //       data: articles,
  //     });
  //   }

  //   static FlagComment(req, res) {
  //     const desiredComment = find.searchComment(req.article.value.commentId);
  //     if (!desiredComment) {
  //       return res.status(404).json({
  //         status: 404,
  //         error: 'comment not found',
  //       });
  //     }
  //     const unwantedCommentIndex = comments.indexOf(desiredComment);
  //     comments[unwantedCommentIndex].tag = 'inappropriate';
  //     return res.status(200).json({
  //       status: 200,
  //       message: 'marked as inappropriate',
  //       data: comments,
  //     });
  //   }

  //   static RemoveFlagedArticles(req, res) {
  //     if (req.user.isAdmin === true) {
  //       const article = find.searchArtById(parseInt(req.params.id));
  //       if (!article) {
  //         return res.status(404).json({
  //           status: 404,
  //           error: 'article not found',
  //         });
  //       }
  //       if (article.tag === 'inappropriate') {
  //         const unwantedArticle = articles.indexOf(article);
  //         articles.splice(unwantedArticle, 1);
  //         return res.status(204).json({
  //           status: 204,
  //         });
  //       }
  //       return res.status(400).json({
  //         status: 400,
  //         error: 'article is normal',
  //       });
  //     }
  //     return res.status(403).json({
  //       status: 403,
  //       error: 'Only admin has access',
  //     });
  //   }

  //   static RemoveFlagedComments(req, res) {
  //     if (req.user.isAdmin === true) {
  //       const commentId = parseInt(req.params.id);
  //       const foundComment = find.searchComment(commentId);
  //       if (!foundComment) {
  //         return res.status(404).json({
  //           status: 404,
  //           error: 'comments not found',
  //         });
  //       }
  //       if (foundComment.tag === 'inappropriate') {
  //         const unwantedComments = comments.indexOf(foundComment);
  //         comments.splice(unwantedComments, 1);
  //         return res.status(204).json({
  //           status: 204,
  //         });
  //       }
  //       return res.status(400).json({
  //         status: 400,
  //         error: 'article is normal',
  //       });
  //     }
  //     return res.status(403).json({
  //       status: 403,
  //       error: 'Only admin has access',
  //     });
  //   }
}

export default articleController;
