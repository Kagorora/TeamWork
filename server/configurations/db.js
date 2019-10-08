import con from '../dbConnection';
import users from '../models/users';
import articles from '../models/articles';

const createTables = async () => {
  const tableUser = users.createUsers;
  const tableArticles = articles.CreateArticles;
  const tables = `${tableUser}; ${tableArticles};`;

  await con.query(tables);
};
createTables();

export default createTables;
