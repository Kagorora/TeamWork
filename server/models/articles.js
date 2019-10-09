const CreateArticles = `
CREATE TABLE IF NOT EXISTS articles (
    id UUID PRIMARY KEY,
    title text UNIQUE,
    article text,
    category text,
    flag text,
    createdOn date,
    userId UUID,
    foreign key(userId) references users ON DELETE CASCADE
)`;

const addArticle = `insert into articles (
    id,
    title,
    article,
    category,
    flag,
    createdOn,
    userId
)VALUES($1,$2,$3,$4,$5,$6, $7) ON CONFLICT DO NOTHING returning *`;

const searchArticle = 'select * from articles where id = ($1)';
const updateArticle = 'update articles set title = ($1), article = ($2), category = ($3) where id = ($4)';

const articles = [

];

export default {
  addArticle,
  searchArticle,
  CreateArticles,
  articles,
  updateArticle,
};
