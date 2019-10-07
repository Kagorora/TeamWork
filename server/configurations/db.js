import con from '../../dbConnection';
import users from '../models/users';

const createTables = async () => {
  const tableUser = users.createUsers;
  const tables = `${tableUser};`;

  await con.query(tables);
};
createTables();

export default createTables;
