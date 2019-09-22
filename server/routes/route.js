import express from 'express';
import userController from '../controllers/userController';
import articleController from '../controllers/articleController';
import auth from '../middlewares/auth';

const app = express();

app.get('/', userController.welcome);

app.post('/api/v1/auth/signup', userController.signup);
app.post('/api/v1/auth/login', userController.login);

app.post('/api/v1/createArticle', auth, articleController.createArticle);
app.patch('/api/v1/article/:id', auth, articleController.editArticle);
app.delete('/api/v1/article/:id', auth, articleController.deleteArticle);
app.post('/api/v1/articles/:id/comments', auth, articleController.createComments);
app.get('/api/v1/article/', auth, articleController.viewAllArticles);
app.get('/api/v1/article/:id', auth, articleController.findArticle);

app.get('/api/v1/articles/:category', auth, articleController.viewByCategories);
app.patch('/api/v1/articles/:id', auth, articleController.FlagArticle);
app.patch('/api/v1/comments/:id', auth, articleController.FlagComment);

export default app;
