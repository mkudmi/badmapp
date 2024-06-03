import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./styles.css";

function GamePayment() {
    const [games, setGames] = useState([]);
    const [selectedGame, setSelectedGame] = useState("");
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchGames = async () => {
            try {
                const response = await fetch('http://localhost:8080/games');
                const data = await response.json();
                setGames(data);
                setLoading(false);
            } catch (error) {
                console.error('Ошибка при загрузке данных игр:', error);
                setLoading(false);
            }
        };

        fetchGames();
    }, []);

    const handleGameChange = async (e) => {
        const selectedDate = e.target.value;
        setSelectedGame(selectedDate);

        try {
            const response = await fetch(`http://localhost:8080/users_from_game?date=${selectedDate}`);
            const data = await response.json();
            setUsers(data);
        } catch (error) {
            console.error('Ошибка при загрузке данных пользователей:', error);
        }
    };

    const formatDate = (dateTime) => {
        const date = new Date(dateTime);
        const formattedDate = date.toLocaleDateString('ru-RU', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric'
        }).replace(/\//g, '-'); // Формат ДД-ММ-ГГГГ
        return formattedDate;
    };

    return (
        <div className="container payment-container">
            <h1>Оплата</h1>
            <div className="form-group">
                <label htmlFor="gameSelect">Выберите игру:</label>
                <select id="gameSelect" className="form-control" onChange={handleGameChange}>
                    <option value="">Выберите игру</option>
                    {loading ? (
                        <option disabled>Загрузка...</option>
                    ) : (
                        games.map(game => (
                            <option key={game.date} value={game.date}>
                                {`${game.owner}, ${formatDate(game.date)}`}
                            </option>
                        ))
                    )}
                </select>
            </div>
            {selectedGame && (
                <div className="table-container">
                    <table className="table table-striped">
                        <thead>
                        <tr>
                            <th>Имя</th>
                            <th>Фамилия</th>
                            <th>Оплачено</th>
                        </tr>
                        </thead>
                        <tbody>
                        {users.map((user, index) => (
                            <tr key={index}>
                                <td>{user.firstName}</td>
                                <td>{user.lastName}</td>
                                <td>
                                    <input type="checkbox" defaultChecked={user.paid} />
                                </td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </div>
            )}
            <Link to="/admin" className="btn btn-primary mt-3">Назад</Link>
        </div>
    );
}

export default GamePayment;
