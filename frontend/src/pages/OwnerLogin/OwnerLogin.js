import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./OwnerLogin.css";

function OwnerLogin() {
    const [login, setLogin] = useState("");
    const [pass, setPass] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();

        // Input validation
        if (!login || !pass) {
            setError("Все поля обязательны для заполнения.");
            return;
        }

        try {
            const response = await fetch("http://localhost:8080/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ login, pass })
            });

            if (response.ok) {
                navigate("/admin");
            } else {
                const errorData = await response.json();
                setError(errorData.message || "Неверные логин или пароль.");
            }
        } catch (error) {
            setError("Произошла ошибка при обработке вашего запроса.");
        }
    };

    return (
        <div className="owner-login-container">
            <form className="login-form" onSubmit={handleLogin}>
                <h2>Форма входа</h2>
                <label htmlFor="username">Имя пользователя:</label>
                <input
                    type="text"
                    id="username"
                    name="username"
                    value={login}
                    onChange={(e) => setLogin(e.target.value)}
                />
                <label htmlFor="password">Пароль:</label>
                <input
                    type="password"
                    id="password"
                    name="password"
                    value={pass}
                    onChange={(e) => setPass(e.target.value)}
                />
                <button type="submit">Войти</button>
                {error && <div className="error-message">{error}</div>}
            </form>
            <Link to="/" className="back-link">Назад</Link>
        </div>
    );
}

export default OwnerLogin;

