const { Sequelize } = require('sequelize');
// const { PostgresDialect } = require('@sequelize/postgres');

const { config } = require('./../config/config');

const { setupModels } = require('../db/models');

// elementos protegidos, que no queremos que se revelen
const USER = encodeURIComponent(config.dbUser);
const PASSWORD = encodeURIComponent(config.dbPassword);

// URL de conexion, que suelen ser remotas
const URI = `postgres://${USER}:${PASSWORD}@${config.dbHost}:${config.dbPort}/${config.dbName}`

const sequelize = new Sequelize(URI, {
    dialect: 'postgres',
    logging: console.log,
  });
  
setupModels(sequelize);

sequelize.sync();

module.exports = sequelize;