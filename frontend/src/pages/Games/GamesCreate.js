import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./GamesCreate.css";

function GameCreate() {
    const [date, setDate] = useState("");
    const [hour, setHour] = useState("00");
    const [minute, setMinute] = useState("00");
    const [owner, setOwner] = useState("");
    const [fields, setFieldsCount] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Input validation
        if (!date || !hour || !minute || !owner || !fields) {
            setError("Все поля обязательны для заполнения.");
            return;
        }

        if (isNaN(fields) || fields <= 0) {
            setError("Кол-во полей должно быть положительным числом.");
            return;
        }

        const dateTime = new Date(`${date}T${hour}:${minute}:00`);

        if (isNaN(dateTime.getTime())) {
            setError("Неправильный формат даты или времени.");
            return;
        }

        try {
            const response = await fetch("http://localhost:8080/games", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ date: dateTime.toISOString(), owner, fields })
            });

            if (response.ok) {
                alert("Игра успешно создана!");
                navigate("/admin");
            } else {
                const errorData = await response.json();
                setError(errorData.message || "Произошла ошибка при создании игры.");
            }
        } catch (error) {
            setError("Произошла ошибка при обработке вашего запроса.");
        }
    };

    return (
        <div className="games-add-container">
            <form className="add-form" onSubmit={handleSubmit}>
                <h2>Создать игру</h2>
                <label htmlFor="date">Дата:</label>
                <input
                    type="date"
                    id="date"
                    name="date"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                />
                <label htmlFor="time">Время:</label>
                <div className="time-picker">
                    <select
                        id="hour"
                        name="hour"
                        value={hour}
                        onChange={(e) => setHour(e.target.value)}
                    >
                        {[...Array(24).keys()].map((h) => (
                            <option key={h} value={String(h).padStart(2, "0")}>
                                {String(h).padStart(2, "0")}
                            </option>
                        ))}
                    </select>
                    :
                    <select
                        id="minute"
                        name="minute"
                        value={minute}
                        onChange={(e) => setMinute(e.target.value)}
                    >
                        {["00", "15", "30", "45"].map((m) => (
                            <option key={m} value={m}>
                                {m}
                            </option>
                        ))}
                    </select>
                </div>
                <label htmlFor="owner">Хост:</label>
                <input
                    type="text"
                    id="owner"
                    name="owner"
                    value={owner}
                    onChange={(e) => setOwner(e.target.value)}
                />
                <label htmlFor="fields">Кол-во полей:</label>
                <input
                    type="number"
                    id="fields"
                    name="fields"
                    value={fields}
                    onChange={(e) => setFieldsCount(e.target.value)}
                />
                <button type="submit">Создать</button>
                {error && <div className="error-message">{error}</div>}
            </form>
            <Link to="/admin" className="back-link">Назад</Link>
        </div>
    );
}

export default GameCreate;