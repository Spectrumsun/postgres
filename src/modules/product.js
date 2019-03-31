const { Pool } = require('pg');
const dotenv = require('dotenv');


dotenv.config();

const pool = new Pool({
  connectionString: process.env.DATABASE_URL
});

pool.on('connect', () => {
  console.log('connected to the db');
});


const createTables = async () => {
  const queryText =
    `CREATE TABLE IF NOT EXISTS
      products(
        id UUID PRIMARY KEY,
        name VARCHAR(128) NOT NULL,
        amount VARCHAR(128) NOT NULL,
        quantity VARCHAR(128) NOT NULL,
        createdAt TIMESTAMP,
        updatedAt TIMESTAMP
      )`;
  try {
    const res = await pool.query(queryText);
    console.log(res);
    await  pool.end();
  }catch(err) {
    console.log(err);
    await pool.end();
  }
}

/**
 * Drop Tables
 */
const dropTables = async () => {
  const queryText = 'DROP TABLE IF EXISTS products';
  pool.query(queryText)
  try {
    const res = await pool.query(queryText);
    console.log(res);
    await pool.end();
  }catch(err) {
    console.log(err);
    await pool.end();
  } 
}

pool.on('remove', () => {
  console.log('client removed');
  process.exit(0);
});

module.exports = {
  createTables,
  dropTables
};

require('make-runnable');