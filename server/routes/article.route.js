import express from 'express';
import articleController from '../controllers/articleController';
import auth from '../middlewares/auth';
import articleValidation from '../middlewares/newArticle';
import checkAuthor from '../middlewares/authorCheck';

const app = express();

app.all('*', auth);

app.post('/', articleValidation.article, articleController.createArticle);
app.patch('/:id', articleValidation.validateUUID, checkAuthor.checkAuthor, articleValidation.edit, articleController.editArticle);
// app.delete('/:id', articleValidation.delete, articleController.deleteArticle);
// app.get('/feeds', articleController.viewAllArticles);
// app.get('/:id', articleValidation.findArticle, articleController.findArticle);
// app.get('/category/:category', articleValidation.findByCategory, articleController.viewByCategories);
// app.patch('/:id/flag', articleValidation.findArticle, articleController.FlagArticle);
// app.delete('/flaged/:id', articleValidation.findArticle, articleController.RemoveFlagedArticles);

export default app;
