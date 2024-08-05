const { Pool } = require('pg');

const pool = new Pool({
    host: 'localhost',
    port: 5432,
    user: 'brunobalza',
    password: 'admin123',
    database: 'my-store'
});

module.exports = { pool };