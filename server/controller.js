// src/controllers/todoController.js
const { Todo } = require("./model");
const { v4: uuidv4 } = require("uuid");

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
    const { title } = req.body; // Убедитесь, что completed по умолчанию false
    console.log(title);
    try {
        const todo = await Todo.create({ id: uuidv4(), title: title, completed: false });
        res.status(201).json(todo);
    } catch (error) {
        console.error("Ошибка при создании задачи:", error);
        res.status(500).json({ message: "Ошибка сервера" });
    }
};

exports.updateTodo = async (req, res) => {
    const { id } = req.params;
    const { title } = req.body;

    try {
        const todo = await Todo.findByPk(id);
        if (!todo) {
            return res.status(404).json({ message: "Задача не найдена" });
        }

        if (title !== undefined) {
            todo.title = title;
        }

        await todo.save();
        return res.json(todo);
    } catch (error) {
        console.error("Ошибка при обновлении задачи:", error);
        return res.status(500).json({ message: "Ошибка сервера" });
    }
};

exports.completedTodo = async (req, res) => {
    const { id } = req.params;

    try {
        const todo = await Todo.findByPk(id);
        if (!todo) {
            return res.status(404).json({ message: "Задача не найдена" });
        }

        // Переключаем состояние completed
        todo.completed = !todo.completed;

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