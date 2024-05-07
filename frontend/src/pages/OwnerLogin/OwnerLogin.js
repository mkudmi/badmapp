import React from "react";
import { Link } from "react-router-dom";
import "./OwnerLogin.css";

function OwnerLogin() {
    return (
        <div className="owner-login-container">
            <form className="login-form">
                <h2>Форма входа</h2>
                <label htmlFor="username">Имя пользователя:</label>
                <input type="text" id="username" name="username" />
                <label htmlFor="password">Пароль:</label>
                <input type="password" id="password" name="password" />
                <button type="submit">Войти</button>
            </form>
            <Link to="/" className="back-link">Назад</Link>
        </div>
    );
}

export default OwnerLogin;
