import express from 'express';
import articleController from '../controllers/commentController';
import auth from '../middlewares/auth';
import articleValidation from '../middlewares/newArticle';

const app = express();

app.post('/:id/comments', auth, articleValidation.validateId, articleValidation.comment, articleController.createComments);
// app.patch('/:id/flag/comment', auth, articleValidation.findComment, articleController.FlagComment);
// app.delete('/:id/flag/comment', auth, articleValidation.findComment, articleController.RemoveFlagedComments);

export default app;
