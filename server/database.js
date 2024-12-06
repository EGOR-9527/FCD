// src/config/database.js
const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('myStore', 'postgres', 'IT1000', {
    host: 'localhost',
    dialect: 'postgres',
});

module.exports = sequelize;