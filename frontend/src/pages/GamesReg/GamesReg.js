import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./GamesReg.css";

function GamesReg() {

    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [selectedGame, setSelectedGame] = useState("");

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
        // Ваша логика отправки данных формы на сервер
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
                        <option value="game1">Игра 1</option>
                        <option value="game2">Игра 2</option>
                        {/* Добавьте другие игры по желанию */}
                    </select>
                <button type="submit">Зарегистрироваться</button>
            </form>
            <Link to="/" className="back-link">Назад</Link>
        </div>
    );
    
}

export default GamesReg;