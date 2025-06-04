const { Sequelize } = require('sequelize');
require('dotenv').config({ path: './.env' }); // ensure .env is loaded

const sequelize = new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USER,
    process.env.DB_PASSWORD,
    {
        host: process.env.DB_HOST,
        dialect: 'mysql',
        logging: false, // optional: disables SQL query logs
    }
);

module.exports = sequelize;
