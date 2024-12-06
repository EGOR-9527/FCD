import React from 'react';
import CompletedTodoList from '../widgets/completedTodoList';

const CompletedTodoListPage: React.FC = () => {
    return (
        <div>
            <h1>Завершенные задачи</h1>
            <CompletedTodoList />
        </div>
    );
};

export default CompletedTodoListPage;