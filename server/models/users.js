/* eslint-disable no-tabs */
const createUsers = `
        CREATE TABLE IF NOT EXISTS users (
          id SERIAL PRIMARY KEY,
          firstName text,
          lastName text,
          email text UNIQUE,
          password text,
          gender text,
          jRole text,
          address text,
          isAdmin boolean,
          department text
        )`;

const addUser = `insert into users (
  firstName,
  lastName,
  email,
  password,
  gender,
  jRole,
  address,
  isAdmin,
  department
)VALUES($1,$2,$3,$4,$5,$6,$7,$8,$9) ON CONFLICT DO NOTHING returning *`;

const removeUser = 'delete from users where email = ($1)';
const searchUser = 'select * from users where email = ($1)';
const withOutPsw = 'select id, firstName, lastName, email, gender, jRole, address, department from users where email = ($1)';

export default {
  addUser,
  removeUser,
  searchUser,
  withOutPsw,
  createUsers,
};
