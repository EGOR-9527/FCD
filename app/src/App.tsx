import React from "react";
import { Routes, Route, Link } from "react-router-dom";
import TodoListPage from "./pages/todoListPage"; // Убедитесь, что путь правильный
import CompletedTodoListPage from "./pages/completedTodoListPage"; // Убедитесь, что путь правильный
import './style.css';

const App: React.FC = () => {
    return (
        <div>
            <nav>
                <ul>
                    <li>
                        <Link to="/">Задачи</Link>
                    </li>
                    <li>
                        <Link to="/completed">Выполненные задачи</Link>
                    </li>
                </ul>
            </nav>
            <Routes>
                <Route path="/" element={<TodoListPage />} />
                <Route path="/completed" element={<CompletedTodoListPage />} />
            </Routes>
        </div>
    );
};

export default App;