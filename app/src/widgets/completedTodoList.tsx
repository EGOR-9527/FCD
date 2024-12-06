import React, { useEffect, useState } from 'react';
import { Api } from '../shared/queriesClient';

interface Todo {
    id: string;
    title: string;
    description: string;
}

const CompletedTodoList: React.FC = () => {
    const [todos, setTodos] = useState<Todo[]>([]);

    const getCompletedTodo = async () => {
        const response = await Api.getCompleted();
        const newTodos = response.map((data: Todo) => ({
            id: data.id,
            title: data.title,
            description: data.description,
        }));
        setTodos(newTodos);
    };

    useEffect(() => {
        getCompletedTodo();
    }, []);

    return (
        <div className='BlockCompleted'>
            {todos.map((todo) => (
                <div className='completedTodo' key={todo.id}>
                    <h3>{todo.title}</h3>
                </div>
            ))}
        </ div>
    );
};

export default CompletedTodoList;