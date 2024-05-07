import React from "react";
import { Link } from "react-router-dom";
import "./AdminPanel.css"

function AdminPanel() {
    return (
        <div className="admin-container">
            <h1>Admin Panel</h1>
            <div className="button-container">
                <Link to="/games/add" className="create-game-button">Создать игру</Link>
                <Link to="/games/add" className="game-info-button">Информация об играх</Link>
                <Link to="/games/add" className="update-game-button">Редактировать игру</Link>
                <Link to="/games/add" className="delete-game-button">Удалить игру</Link>
                <Link to="/" className="back-link">Назад</Link>
            </div>
        </div>
    );
}

export default AdminPanel;