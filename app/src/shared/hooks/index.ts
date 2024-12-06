import { useState } from "react";

interface Todo {
    id: string; // Используем string для идентификатора
    title: string;
    completed: boolean;
}

export const useTodos = () => {
    const [todos, setTodos] = useState<Todo[]>([]);

    const addTodo = (id: string, title: string, completed: boolean) => {
        const newTodo: Todo = {
            id,
            title,
            completed,
        };
        setTodos(prevTodos => [... prevTodos, newTodo]);
    };

    const toggleTodo = (id: string) => {
        setTodos(todos.map(todo => 
            todo.id === id ? { ...todo, completed: !todo.completed } : todo
        ));
    };

    const deleteTodo = (id: string) => {
        setTodos(todos.filter(todo => todo.id !== id));
    };

    return {
        todos,
        addTodo,
        deleteTodo,
        toggleTodo,
    };
};