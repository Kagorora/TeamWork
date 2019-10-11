import express from 'express';
import articleController from '../controllers/commentController';
import auth from '../middlewares/auth';
import articleValidation from '../middlewares/newArticle';

const app = express();

app.post('/:id/comments', auth, articleValidation.validateId, articleValidation.comment, articleController.createComments);

export default app;
