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


export default {
  addComment,
  searchComment,
  createComment,
};
