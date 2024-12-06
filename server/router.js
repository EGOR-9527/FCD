// src/routes/todoRoutes.js
const express = require('express');
const router = express.Router();
const todoController = require('./controller');

router.get('/getTodos', todoController.getTodos);
router.get('/getSelected', todoController.getSelected);
router.post('/createTodo', todoController.createTodo);
router.put('/updateTodo/:id', todoController.updateTodo);
router.delete('/deleteTodo/:id', todoController.deleteTodo);

module.exports = router;