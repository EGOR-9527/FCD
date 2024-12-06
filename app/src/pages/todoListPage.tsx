import React from 'react';
import {TodoList} from '../widgets/todoList';

const TodoListPage: React.FC = () => {
    return (
        <div>
            <h1>Список задач</h1>
            <TodoList />
        </div>
    );
};

export default TodoListPage;