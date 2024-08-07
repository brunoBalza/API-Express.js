const { config } = require('./../config/config')
const { Sequelize } = require('sequelize');

// elementos protegidos, que no queremos que se revelen
const USER = encodeURIComponent(config.dbUser);
const PASSWORD = encodeURIComponent(config.dbPassword);

// URL de conexion, que suelen ser remotas
const URI = `postgres://${USER}:${PASSWORD}@${config.dbHost}:${config.dbPort}/${config.dbName}`

const sequelize = new Sequelize(URI,{
    dialect: 'postgres',
    logging: console.log,
});

sequelize.authenticate()
    .then(() => {
        console.log('Conexión exitosa a la base de datos.');
    })
    .catch(err => {
        console.error('No se pudo conectar a la base de datos:', err);
    });

module.exports = { sequelize };
