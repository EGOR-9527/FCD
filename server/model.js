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

const Selected = sequelize.define("Selected", {
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
  },
});

module.exports = {Todo, Selected};
