import React, { useState, useEffect } from 'react';
import { Api } from "../shared/queriesClient";

interface Todo {
    id: string;
    title: string;
    description: string;
    completed: boolean;
}

export const TodoList: React.FC = () => {
    const [todos, setTodos] = useState<Todo[]>([]);
    const [editingTodoId, setEditingTodoId] = useState<string | null>(null);
    const [editingTitle, setEditingTitle] = useState<string>('');

    const getTodos = async () => {
        const response = await Api.getTodos();
        const newTodos = response
            .filter((data: Todo) => !data.completed) // Фильтруем только невыполненные задачи
            .map((data: Todo) => ({
                id: data.id,
                title: data.title,
                description: data.description,
                completed: data.completed,
            }));
        setTodos(newTodos);
    };

    useEffect(() => {
        getTodos();
    }, []);

    const createTodo = async (title: string) => {
        try {
            const response = await Api.createTodo(title);
            if (response.id) {
                const newTodo = {
                    id: response.id,
                    title,
                    description: '',
                    completed: false,
                };
                setTodos([...todos, newTodo]);
            }

            getTodos();
        } catch (error) {
            console.error("Ошибка при создании задачи:", error);
        }
    };

    const updateTodo = async (id: string, title: string) => {
        const response = await Api.updateTodo(id, title);
        if (response) {
            const updatedTodos = todos.map(todo => todo.id === id ? { ...todo, title } : todo);
            setTodos(updatedTodos);
            setEditingTodoId(null);
            setEditingTitle('');
        }

        getTodos();
    };

    const completedTodo = async (id: string) => {
        const response = await Api.completedTodo(id);
        if (response) {
            const updatedTodos = todos.map(todo => todo.id === id ? { ...todo, completed: !todo.completed } : todo);
            setTodos(updatedTodos);
        }

        getTodos();
    };

    const deleteTodo = async (id: string) => {
        const response = await Api.deleteTodo(id);
        if (response) {
            setTodos(todos.filter(todo => todo.id !== id));
        }

        getTodos();
    };

    const handleEditClick = (todo: Todo) => {
        setEditingTodoId(todo.id);
        setEditingTitle(todo.title);
    };

    return (
        <div>
            <div className="blockAddTodo">
                <input
                    type="text"
                    placeholder="Введите задачу"
                    className='MainInput'
                    onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                            createTodo((e.target as HTMLInputElement).value);
                            (e.target as HTMLInputElement).value = '';
                        }
                    }}
                />
                <button className='MainButton' onClick={() => createTodo((document.querySelector('input[type="text"]') as HTMLInputElement).value)}>+</button>
            </div>
            <ul className='TodoList'>
                {todos.map(todo => (
                    <li className='cartTodo' key={todo.id}>
                        <input
                            type="checkbox"
                            className=''
                            checked={todo.completed}
                            onChange={() => completedTodo(todo.id)}
                        />
                        {editingTodoId === todo.id ? (
                            <>
                                <input
                                    type="text"
                                    value={editingTitle}
                                    onChange={(e) => setEditingTitle(e.target.value)}
                                />
                                <button className='ButtonTodo' onClick={() => updateTodo(todo.id, editingTitle)}>Сохранить</button>
                            </>
                        ) : (
                            <>
                                <span>{todo.title}</span>
                                <button className='ButtonTodo' onClick={() => handleEditClick(todo)}>Редактировать</button>
                            </>
                        )}
                        <p>{todo.completed ? 'Выполнено' : 'Невыполнено'}</p>
                        <button className='ButtonTodo' onClick={() => deleteTodo(todo.id)}>Удалить</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};