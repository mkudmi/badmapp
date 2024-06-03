import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./styles.css";

function GamesUnreg() {
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
                setGameDates(data); // Предполагается, что сервер возвращает массив объектов с полями, включая date и owner
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
        const queryParams = new URLSearchParams({
            firstName: firstName,
            lastName: lastName,
            date: selectedGame
        });

        // Отправка DELETE запроса на сервер
        fetch(`http://localhost:8080/user_from_game?${queryParams.toString()}`, {
            method: 'DELETE'
        })
            .then(response => {
                if (response.ok) {
                    setError("");
                    alert("Вы успешно снялись с регистрации на игру!");
                    navigate("/");
                } else {
                    return response.json().then(errorData => {
                        setError(errorData.message || "Ошибка при снятии с регистрации на игру.");
                    });
                }
            })
            .catch(error => {
                console.error('Ошибка при отправке данных:', error);
                setError("Произошла ошибка при обработке вашего запроса.");
            });
    };

    const formatDateTime = (dateTime) => {
        const date = new Date(dateTime);
        const formattedDate = date.toLocaleDateString('ru-RU', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric'
        }).replace(/\//g, '-'); // Формат ДД-ММ-ГГГГ
        const formattedTime = date.toLocaleTimeString('ru-RU', {
            hour: '2-digit',
            minute: '2-digit',
            hour12: false
        }); // Формат 24 часа без секунд
        return `${formattedTime}, ${formattedDate}`;
    };

    return (
        <div className="container registration-form-container">
            <form className="form-container registration-form" onSubmit={handleSubmit}>
                <h2>Сняться с регистрации на игру</h2>
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
                            <option key={game.date} value={game.date}>
                                {`${game.owner}, ${formatDateTime(game.date)}`}
                            </option>
                        ))
                    )}
                </select>
                <button type="submit">Сняться с регистрации</button>
                {error && <div className="error-message">{error}</div>}
                <Link to="/" className="back-link">Назад</Link>
            </form>
        </div>
    );
}

export default GamesUnreg;
