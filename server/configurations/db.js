import con from '../dbConnection';
import users from '../models/users';
import articles from '../models/articles';
import comments from '../models/comments';

const createTables = async () => {
  const tableUser = users.createUsers;
  const tableArticles = articles.CreateArticles;
  const tableComments = comments.createComment;
  const tables = `${tableUser}; ${tableArticles}; ${tableComments};`;

  await con.query(tables);
};
createTables();

export default createTables;
