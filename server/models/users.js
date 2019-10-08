/* eslint-disable no-tabs */
const createUsers = `
        CREATE TABLE IF NOT EXISTS users (
          id UUID PRIMARY KEY,
          firstName text,
          lastName text,
          email text UNIQUE,
          password text,
          gender text,
          isadmin boolean
        )`;

const addUser = `insert into users (
    id,
	  firstName,
    lastName,
    email,
    password,
    gender,
    isAdmin
)VALUES($1,$2,$3,$4,$5,$6,$7) ON CONFLICT DO NOTHING returning *`;

const removeUser = 'delete from users where email = ($1)';
const searchUser = 'select * from users where email = ($1)';
const withOutPsw = 'select id, firstName, lastName, email, gender from users where email = ($1)';

export default {
  addUser,
  removeUser,
  searchUser,
  withOutPsw,
  createUsers,
};
