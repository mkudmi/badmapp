import React from "react";
import {Link} from "react-router-dom";
import "./styles.css";

function AdminPanel() {
    return (
        <div className="container admin-container">
            <h1>Admin Panel</h1>
            <div className="button-container-admin">
                <Link to="/games/create" className="create-game-button">Создать игру</Link>
                <Link to="/games/info" className="game-info-button">Информация об играх</Link>
                <Link to="/games/pay" className="game-payment-button">Оплата</Link>
                <Link to="/" className="back-link">Назад</Link>
            </div>
        </div>
    );
}

export default AdminPanel;
