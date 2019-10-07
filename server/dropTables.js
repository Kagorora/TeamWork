import con from './dbConnection';

const dropTables = async () => {
  await con.query('DELETE FROM users;');
};
dropTables();

export default dropTables;
