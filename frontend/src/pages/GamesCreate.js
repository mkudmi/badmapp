import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./styles.css";

function GameCreate() {
    const [date, setDate] = useState("");
    const [hour, setHour] = useState("06");
    const [minute, setMinute] = useState("00");
    const [owner, setOwner] = useState("");
    const [fields, setFieldsCount] = useState("");
    const [price, setPrice] = useState("");
    const [error, setError] = useState("");
    const [owners, setOwners] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        // Получение списка владельцев
        fetch("http://localhost:8080/owners")
            .then(response => response.json())
            .then(data => setOwners(data))
            .catch(error => {
                console.error('Ошибка при загрузке данных:', error);
                setError("Не удалось загрузить список владельцев.");
            });
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Input validation
        if (!date || !hour || !minute || !owner || !fields || !price) {
            setError("Все поля обязательны для заполнения.");
            return;
        }

        if (isNaN(fields) || fields <= 0) {
            setError("Кол-во полей должно быть положительным числом.");
            return;
        }

        if (isNaN(price) || price <= 0) {
            setError("Цена должна быть положительным числом.");
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
                body: JSON.stringify({ date: dateTime.toISOString(), owner, fields, price })
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
        <div className="container games-add-container">
            <form className="form-container add-form" onSubmit={handleSubmit}>
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
                        {[...Array(18).keys()].map((h) => {
                            const value = String(h + 6).padStart(2, "0");
                            return (
                                <option key={value} value={value}>
                                    {value}
                                </option>
                            );
                        })}
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
                <select
                    id="owner"
                    name="owner"
                    value={owner}
                    onChange={(e) => setOwner(e.target.value)}
                >
                    <option value="">Выберите хоста</option>
                    {owners.map((owner) => (
                        <option key={owner.id} value={`${owner.name} ${owner.surname}`}>
                            {owner.name} {owner.surname}
                        </option>
                    ))}
                </select>
                <label htmlFor="fields">Кол-во полей:</label>
                <input
                    type="number"
                    id="fields"
                    name="fields"
                    value={fields}
                    onChange={(e) => setFieldsCount(e.target.value)}
                />
                <label htmlFor="price">Цена:</label> {/* Новое поле для цены */}
                <input
                    type="number"
                    id="price"
                    name="price"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                />
                <button type="submit">Создать</button>
                <Link to="/admin" className="back-link">Назад</Link>
                {error && <div className="error-message">{error}</div>}
            </form>
            <div className="button-container">
                
            </div>
        </div>
    );
}

export default GameCreate;
