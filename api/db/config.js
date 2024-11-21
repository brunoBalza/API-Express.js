const { config } = require('./../config/config');

// elementos protegidos, que no queremos que se revelen
const USER = encodeURIComponent(config.dbUser);
const PASSWORD = encodeURIComponent(config.dbPassword);

// URL de conexion, que suelen ser remotas
const URI = `mysql://${USER}:${PASSWORD}@${config.dbHost}:${config.dbPort}/${config.dbName}`

module.exports = {
    development: {
        url : URI,
        dialect: 'postgres'
    },
    production: {
        url : URI,
        dialect: 'postgres'
    }
}