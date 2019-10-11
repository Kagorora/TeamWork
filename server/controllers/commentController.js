/* eslint-disable max-len */
/* eslint-disable radix */
import comments from '../models/comments';
import con from '../dbConnection';
import articles from '../models/articles';

class commentController {
  static async createComments(req, res) {
    const desiredArticle = await con.query(articles.searchArticle, [parseInt(req.params.id)]);
    if (desiredArticle.rowCount === 0) {
      return res.status(404).json({
        status: 404,
        message: 'article not found',
      });
    }
    const {
      title,
      article,
    } = desiredArticle.rows[0];
    const createComment = await con.query(comments.addComment, [title, article, req.body.comment, req.user.id, req.comment.value.flag]);
    return res.status(201).json({
      status: 201,
      message: 'comment successfully created',
      data: createComment.rows[0],
    });
  }
}

export default commentController;
