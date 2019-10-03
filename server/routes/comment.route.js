import express from 'express';
import articleController from '../controllers/articleController';
import auth from '../middlewares/auth';
import articleValidation from '../middlewares/newArticle';

const app = express();

app.post('/:id/comments', auth, articleValidation.comment, articleController.createComments);
app.patch('/:id/flag/comment', auth, articleValidation.findComment, articleController.FlagComment);
app.delete('/:id/flag/comment', auth, articleValidation.findComment, articleController.RemoveFlagedComments);

export default app;
