import con from './dbConnection';

const dropTables = async () => {
  // await con.query('delete from articles;');
  await con.query('delete from users;');
};
dropTables();

export default dropTables;
