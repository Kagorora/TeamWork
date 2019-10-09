import con from './dbConnection';

const dropTables = async () => {
  // await con.query('DROP TABLE articles;');
  await con.query('DROP TABLE users;');
};
dropTables();

export default dropTables;
