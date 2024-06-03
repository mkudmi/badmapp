import React, {useState} from "react";
import {Link, useNavigate} from "react-router-dom";
import "./styles.css";

function OwnerRegistration() {
    const [name, setName] = useState("");
    const [surname, setSurname] = useState("");
    const [login, setLogin] = useState("");
    const [pass, setPass] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleRegistration = async (e) => {
        e.preventDefault();

        // Input validation
        if (!name || !surname || !login || !pass) {
            setError("Все поля обязательны для заполнения.");
            return;
        }

        try {
            const response = await fetch("http://localhost:8080/owner", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({name, surname, login, pass})
            });

            if (response.ok) {
                navigate("/login"); // Перенаправляем пользователя на страницу логина после успешной регистрации
            } else {
                const errorData = await response.json();
                setError(errorData.message || "Ошибка при регистрации.");
            }
        } catch (error) {
            setError("Произошла ошибка при обработке вашего запроса.");
        }
    };

    return (
        <div className="container owner-registration-container">
            <form className="form-container registration-form" onSubmit={handleRegistration}>
                <h2>Форма регистрации</h2>
                <label htmlFor="name">Имя:</label>
                <input
                    type="text"
                    id="name"
                    name="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />
                <label htmlFor="name">Фамилия:</label>
                <input
                    type="text"
                    id="surname"
                    name="surname"
                    value={surname}
                    onChange={(e) => setSurname(e.target.value)}
                />
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
                <button type="submit">Зарегистрироваться</button>
                {error && <div className="error-message">{error}</div>}
                <Link to="/login" className="back-link">Назад</Link>
            </form>
        </div>
    );
}

export default OwnerRegistration;
