import React, { useEffect, useState } from 'react';
import { api } from '../../shared/api/todos';

export const Selected: React.FC = () => {
    const [completedTodos, setCompletedTodos] = useState<any[]>([]); // Инициализация как пустой массив

    const fetchCompletedTodos = async () => {
        try {
            const response = await api.getCompleted();
            if (Array.isArray(response)) {
                setCompletedTodos(response);
            } else {
                console.error('Ответ не является массивом:', response);
            }
        } catch (error) {
            console.error('Ошибка при получении выполненных задач:', error);
        }
    };

    useEffect(() => {
        fetchCompletedTodos();
    }, []);

    return (
        <div>
            <h1>Выполненные задачи</h1>
            {completedTodos && completedTodos.length > 0 ? ( // Проверка на наличие данных
                completedTodos.map((todo) => (
                    <div key={todo.id}>
                        <h2>{todo.title}</h2>
                        <p>Статус: {todo.completed ? 'Выполнено' : 'Не выполнено'}</p>
                    </div>
                ))
            ) : (
                <p>Нет выполненных задач.</p>
            )}
        </div>
    );
};