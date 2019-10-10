const CreateArticles = `
CREATE TABLE IF NOT EXISTS articles (
    id SERIAL PRIMARY KEY ,
    title text UNIQUE,
    article text,
    category text,
    flag text DEFAULT 'normal',
    createdOn TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    userId SERIAL,
    foreign key(userId) references users ON DELETE CASCADE
)`;

const addArticle = `insert into articles (
    title,
    article,
    category,
    flag,
    userId
)VALUES($1,$2,$3,$4,$5) ON CONFLICT DO NOTHING returning *`;

const searchArticle = 'select * from articles where id = ($1)';
const updateArticle = 'update articles set title = ($1), article = ($2), category = ($3) where id = ($4)';
const removeArticle = 'delete from articles where id = ($1)';
const findAllArticles = 'select * from articles ORDER BY createdon DESC';
const searchAByCategory = 'select * from articles where category = ($1)';
const FlagArticle = 'update articles set flag = ($1) where id = ($2)';
const articles = [

];

export default {
  addArticle,
  searchArticle,
  CreateArticles,
  articles,
  updateArticle,
  removeArticle,
  findAllArticles,
  searchAByCategory,
  FlagArticle,
};
