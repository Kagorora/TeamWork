import express from 'express';
import userController from '../controllers/userController';
import userValidation from '../middlewares/new';

const app = express();

app.post('/signup', userValidation.signup, userController.signup);
app.post('/signin', userValidation.login, userController.login);

export default app;
