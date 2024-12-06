import React, { useState, useEffect } from "react";
import { useTodos } from "../../shared/hooks/index";
import { api } from "../../shared/api/todos/index"; // Импортируем api
import { v4 as uuidv4 } from 'uuid'; // Импортируем библиотеку для генерации уникальных ID
import "../../style.css";

export const TodoApp: React.FC = () => {
    const { todos, addTodo, deleteTodo, toggleTodo } = useTodos(); // Вызов хука
    const [text, setText] = useState<string>(""); // Используем строку для состояния

    // Функция для получения задач
    const fetchTodos = async () => {
        try {
            if (!api) {
                throw new Error("Api не существует");
            }
            const response = await api.getTodos();
            if (!Array.isArray(response)) {
                throw new Error("Ответ не является массивом");
            }
            console.log("response: ", response)

            response.forEach((todo) => {
                addTodo(todo.id, todo.title, todo.completed);
            });
        } catch (error) {
            console.error("Ошибка при получении задач:", error);
        }
    };

    useEffect(() => {
        fetchTodos();
        console.log("todos: ", todos);
    }, []); // Запускаем только один раз при монтировании компонента

    const handleAddTodo = async () => {
        if (text.trim() !== "") {
            const newTodo = {
                id: uuidv4(), // Генерация уникального строкового ID
                title: text,
                completed: false,
            };
            try {
                await api.postCreateTodo(newTodo); // Отправляем новую задачу на сервер
                addTodo(newTodo.id, newTodo.title, newTodo.completed); // Добавляем задачу в локальное состояние
                setText(""); // Очищаем поле ввода после добавления
            } catch (error) {
                console.error(" Ошибка при добавлении задачи:", error);
            }
        }
    };

    const handleDelete = async (id: string) => { // id остается строкой
        try {
            await api.deleteTodo(id); // Убедитесь, что id - это строка
            deleteTodo(id);
        } catch (error) {
            console.error("Ошибка при удалении задачи: ", error);
        }
    };

    const handleToggle = async (id: string) => {
        try {
            // Получите текущие данные задачи, чтобы не потерять title
            const currentTodo = todos.find(todo => todo.id === id);
            if (!currentTodo) {
                throw new Error("Задача не найдена");
            }

            // Обновляем состояние задачи в базе данных
            await api.putUpdateTodo(id, { completed: !currentTodo.completed, title: currentTodo.title });

            // Удаляем задачу из локального состояния
            deleteTodo(id);
        } catch (error) {
            console.error("Ошибка при обновлении задачи:", error);
        }
    };

    return (
        <div className="todoApp">
            <div className="containerAdd">
                <input
                    className="AddInput"
                    type="text"
                    value={text}
                    onChange={(event) => setText(event.target.value)} // Устанавливаем текст
                />
                <button className="AddButton" onClick={handleAddTodo}>Добавить</button>
            </div>
            <div>
                {todos.map((todo) => {
                    return (
                        <div
                            className="Cart"
                            style={todo.completed ? { background: "green", color: "white" } : {}}
                            key={todo.id} // Используйте уникальный идентификатор todo.id в качестве ключа
                        >
                            <input
                                className="CartInput"
                                type="checkbox"
                                checked={todo.completed}
                                onChange={() => handleToggle(todo.id)}
                            />
                            <h2 className="CartTitle">{todo.title}</h2>
                            <button className="CartButton" onClick={() => handleDelete(todo.id)}>удалить</button>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};