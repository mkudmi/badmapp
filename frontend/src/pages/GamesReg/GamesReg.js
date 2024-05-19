import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./GamesReg.css";

function GamesReg() {
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [selectedGame, setSelectedGame] = useState("");
    const [gameDates, setGameDates] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();
    const [error, setError] = useState("");

    useEffect(() => {
        // Получение данных о датах игр с сервера
        fetch("http://localhost:8080/games?is_actual=true")
            .then(response => response.json())
            .then(data => {
                setGameDates(data); // Предполагается, что сервер возвращает массив объектов с полями, включая date
                setLoading(false);
            })
            .catch(error => {
                console.error('Ошибка при загрузке данных:', error);
                setLoading(false);
            });
    }, []);

    const handleFirstNameChange = (e) => {
        setFirstName(e.target.value);
    };

    const handleLastNameChange = (e) => {
        setLastName(e.target.value);
    };

    const handleGameChange = (e) => {
        setSelectedGame(e.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!selectedGame) {
            setError("Выберите дату");
            return; // Прерываем выполнение функции
        }
        
        // Подготовка данных для отправки
        const data = {
            firstName: firstName,
            lastName: lastName,
            date: selectedGame
        };

        // Отправка POST запроса на сервер
        fetch('http://localhost:8080/user_to_game', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
        .then(response => {
            if (response.ok) {
                setError("");
                const successMessage = "Игра успешно создана!";
                setError("");
                alert(successMessage);
                navigate("/");
            } else {
                
            }
        })
    };

    return (
        <div className="registration-form-container">
            <form className="registration-form" onSubmit={handleSubmit}>
                <h2>Регистрация на игру</h2>
                <label htmlFor="firstName">Имя:</label>
                <input type="text" id="firstName" value={firstName} onChange={handleFirstNameChange} />
                <label htmlFor="lastName">Фамилия:</label>
                <input type="text" id="lastName" value={lastName} onChange={handleLastNameChange} />
                <label htmlFor="game">Выберите игру:</label>
                <select id="game" value={selectedGame} onChange={handleGameChange}>
                    <option value="">Выберите игру</option>
                    {loading ? (
                        <option disabled>Загрузка...</option>
                    ) : (
                        gameDates.map(game => (
                            <option key={game.date} value={game.date}>{game.date}</option>
                        ))
                    )}
                </select>
                <button type="submit">Зарегистрироваться</button>
            </form>
            {error && <div className="error-message">{error}</div>}
            <Link to="/" className="back-link">Назад</Link>
        </div>
    );
}

export default GamesReg;
