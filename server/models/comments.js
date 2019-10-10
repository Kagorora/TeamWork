const createComment = `
CREATE TABLE IF NOT EXISTS comments (
    id SERIAL PRIMARY KEY UNIQUE,
    articleTitle text,
    article text,
    comment text,
    flag text,
    createdOn TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    commenterId SERIAL,
    foreign key(commenterId) references users ON DELETE CASCADE
)`;

const addComment = `insert into comments (
    articleTitle,
    article,
    comment,
    commenterId,
    flag
)VALUES($1,$2,$3,$4,$5) ON CONFLICT DO NOTHING returning *`;

const searchComment = 'select * from comments where id = ($1)';
// const updateArticle = 'update comments set title = ($1), article = ($2), category = ($3) where id = ($4)';
// const removeArticle = 'delete from comments where id = ($1)';
// const findAllArticles = 'select * from comments ORDER BY createdon DESC';
// const searchAByCategory = 'select * from comments where category = ($1)';
// const FlagArticle = 'update comments set flag = ($1) where id = ($2)';

export default {
  addComment,
  searchComment,
  createComment,
  // updateArticle,
  // removeArticle,
  // findAllArticles,
  // searchAByCategory,
  // FlagArticle,
};
