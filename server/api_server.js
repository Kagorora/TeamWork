/* eslint-disable no-console */
import express from 'express';
import userRoute from './routes/user.route';
import articleRoute from './routes/article.route';
import commentRoute from './routes/comment.route';

const app = express();

app.use(express.json());
const port = process.env.PORT || 3000;
app.use('/api/v1/auth/', userRoute);
app.use('/api/v1/articles/', articleRoute);
app.use('/api/v1/articles/', commentRoute);

app.use('*', (req, res) => {
  res.status(404).json({ status: 404, message: 'Routes Not found' });
});

app.listen(port, () => console.log(`server is running on port: ${port}`));

export default app;
