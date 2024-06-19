const pool = require('../db');
const bcrypt = require('bcrypt');

const createTable = async()=>{
    const queryText = `
      CREATE TABLE IF NOT EXISTS users(
        id SERIAL PRIMARY KEY,
        username VARCHAR(255) NOT NULL,
        email VARCHAR(255) NOT NULL UNIQUE,
        password VARCHAR(255) NOT NULL
      )
    `;
    await pool.query(queryText);
};


const addUser = async(username, email, password)=>{
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await pool.query(
      `INSERT INTO users (username, email, password) VALUES ($1, $2, $3) RETURNING *`,
      [username, email, hashedPassword]
    );
    return newUser.rows[0];
};

const findUser = async (email) => {
    const result = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
    return result.rows[0];
  };
module.exports = {createTable, addUser, findUser};

