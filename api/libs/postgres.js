const pg = require('pg');
const { Client } = pg

async function getConnection() {
    const client = new Client({
        host: 'localhost',
        port: 5432,
        user: 'brunobalza',
        password: 'admin123',
        database: 'my-store'
    })
    await client.connect();
    return client;
}

module.exports = { getConnection };