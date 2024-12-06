// src/models/Todo.js
const { DataTypes } = require("sequelize");
const sequelize = require("./database");

const Todo = sequelize.define("Todo", {
  id: {
    type: DataTypes.STRING, // Оставляем как строку
    primaryKey: true,
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  completed: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
});



module.exports = {Todo};
