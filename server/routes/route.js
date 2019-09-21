import express from 'express';
import userController from '../controllers/userController';

const app = express();

app.get('/', userController.welcome);
app.post('/api/v1/auth/signup', userController.signup);

export default app;
