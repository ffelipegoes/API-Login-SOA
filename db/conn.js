const { Sequelize } = require('sequelize');

require('dotenv').config();

const dbName = process.env.DB_NAME;
const dbUSer = process.env.DB_USER;
const dbPassword = process.env.DB_PASSWORD;
const dbHost = process.env.DB_HOST;
const dialect = process.env.DIALECT;

const sequelize = new Sequelize(dbName, dbUSer, dbPassword, {
  host: dbHost,
  dialect,
});

try {
  sequelize.authenticate();
  console.log('Conectado com sucesso');
} catch (error) {
  console.error(`Deu Ruim ${error}`);
}

module.exports = sequelize;
