import React from "react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import { TodoListPage } from "./pages/todo-list-page/ui/TodoListPage";
import CompletedTodos from "./pages/todo-list-page/ui/CompletedTodos"; // Измените на default импорт
import './style.css'
const App: React.FC = () => {
    return (
        <Router>
            <nav className="link">
                <Link className="link-teaxt" to="/">Создание задач</Link>
                <Link className="link-teaxt"to="/completed">Выполненные задачи</Link>
            </nav>
            <Routes>
                <Route path="/" element={<TodoListPage />} />
                <Route path="/completed" element={<CompletedTodos />} />
            </Routes>
        </Router>
    );
};

export default App;