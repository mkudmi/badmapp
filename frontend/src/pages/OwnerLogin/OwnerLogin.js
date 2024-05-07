import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./OwnerLogin.css";

function OwnerLogin() {
    const [login, setLogin] = useState("");
    const [pass, setPass] = useState("");
    const [error, setError] = useState(""); // Состояние для хранения сообщения об ошибке
    const navigate = useNavigate(); 

    const handleLogin = async (e) => {
        e.preventDefault();
        
        // Выполняем запрос на сервер
        const response = await fetch("http://localhost:8080/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ login, pass })
        });

        if (response.ok) {
            // Если логин и пароль верны, перенаправляем пользователя на главную страницу
            navigate("/admin");
        } else {
            // Если логин или пароль неверны, отображаем сообщение об ошибке
            setError("Неверные логин или пароль");
        }
    };

    return (
        <div className="owner-login-container">
            <form className="login-form" onSubmit={handleLogin}>
                <h2>Форма входа</h2>
                <label htmlFor="username">Имя пользователя:</label>
                <input type="text" id="username" name="username" value={login} onChange={(e) => setLogin(e.target.value)} />
                <label htmlFor="password">Пароль:</label>
                <input type="password" id="password" name="password" value={pass} onChange={(e) => setPass(e.target.value)} />
                <button type="submit">Войти</button>
                {error && <div className="error-message">{error}</div>} {/* Отображаем сообщение об ошибке */}
            </form>
            <Link to="/" className="back-link">Назад</Link>
        </div>
    );
}

export default OwnerLogin;