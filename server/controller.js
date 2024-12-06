// src/controllers/todoController.js
const { Todo, Selected } = require("./model");

exports.getTodos = async (req, res) => {
  try {
    const todos = await Todo.findAll();
    res.json(todos);
  } catch (error) {
    console.error("Ошибка при получении задач:", error);
    res.status(500).json({ message: "Ошибка сервера" });
  }
};

exports.createTodo = async (req, res) => {
  const data = req.body;
  try {
    const todo = await Todo.create({
      title: data.title,
      completed: data.completed,
    }); // Генерация уникального ID происходит автоматически
    res.status(201).json(todo);
  } catch (error) {
    console.error("Ошибка при создании задачи:", error);
    res.status(500).json({ message: "Ошибка сервера" });
  }
};

exports.updateTodo = async (req, res) => {
  const { id } = req.params;
  const { title, completed } = req.body; // Убедитесь, что вы извлекаете title

  try {
    const todo = await Todo.findByPk(id);
    if (!todo) {
      return res.status(404).json({ message: "Задача не найдена" });
    }

    // Обновляем только те поля, которые были переданы
    if (title !== undefined) {
      todo.title = title;
    }
    if (completed !== undefined) {
      todo.completed = completed;
    }

    await todo.save();
    return res.json(todo);
  } catch (error) {
    console.error("Ошибка при обновлении задачи:", error);
    return res.status(500).json({ message: "Ошибка сервера" });
  }
};

exports.deleteTodo = async (req, res) => {
  const { id } = req.params;
  try {
    const todo = await Todo.findByPk(id);
    if (todo) {
      await todo.destroy();
      res.status(204).send();
    } else {
      res.status(404).json({ message: "Задача не найдена" });
    }
  } catch (error) {
    console.error("Ошибка при удалении задачи:", error);
    res.status(500).json({ message: "Ошибка сервера" });
  }
};

exports.getSelected = async (req, res) => {
  try {
    const completedTodos = await Todo.findAll({ where: { completed: true } });
    return res.json(completedTodos);
  } catch (error) {
    console.error("Ошибка при получении выполненных задач:", error);
    return res.status(500).json({ message: "Ошибка сервера" });
  }
};
