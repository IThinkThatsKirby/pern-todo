const Pool = require('pg').Pool;
require('dotenv').config();
const pool = new Pool({
	user: process.env.PG_USER,
	host: 'localhost',
	database: 'perntodo',
	password: process.env.PG_PASSWORD,
	port: process.env.PG_PORT,
});

module.exports = pool;
