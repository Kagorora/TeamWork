/* eslint-disable import/no-mutable-exports */
import { Pool } from 'pg';
import dotenv from 'dotenv';

dotenv.config();

let pool;

if (process.env.NODE_ENV === 'TEST') {
  pool = new Pool({
    connectionString: process.env.DB_URL_TEST,
  });
} else {
  pool = new Pool({
    connectionString: process.env.DB_URL,
  });
}

export default pool;
