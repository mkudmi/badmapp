import React, { useEffect, useState } from "react";
import { Link } from 'react-router-dom';
import Loading from "../Loading";
import "./styles.css";

function Games() {
    const [loading, setLoading] = useState(true);
    const [games, setGames] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('http://localhost:8080/games');
                const gamesData = await response.json();

                // Получение количества свободных мест для каждой игры
                const gamesWithAvailablePlaces = await Promise.all(gamesData.map(async (game) => {
                    const availablePlacesResponse = await fetch(`http://localhost:8080/games/available_places?date=${game.date}`);
                    const availablePlaces = await availablePlacesResponse.json();
                    return {
                        ...game,
                        availablePlaces: availablePlaces
                    };
                }));

                setGames(gamesWithAvailablePlaces);
                setLoading(false);
            } catch (error) {
                console.error('Ошибка при загрузке данных:', error);
                setLoading(false);
            }
        };

        fetchData();
    }, []);

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
        return `${formattedDate}, ${formattedTime}`;
    };

    if (loading) {
        return <Loading />;
    }

    const gamesDetails = games.map((item, index) => (
        <tr key={index}>
            <td>{item.owner}</td>
            <td>{item.places}</td>
            <td>{item.price}</td>
            <td>{formatDateTime(item.date)}</td>
            <td>{item.availablePlaces}</td>
            <td>
                <Link to={`/games/${item.id}`} className="btn btn-info">Инфо</Link>
            </td>
        </tr>
    ));

    return (
        <div className="container mt-5">
            <div className="row">
                <div className="col-md-12">
                    <div className="card">
                        <div className="card-header">
                            <h4>Список игр</h4>
                        </div>
                        <div className="card-body">
                            <div className="table-container">
                                <table className='table table-striped'>
                                    <thead>
                                    <tr>
                                        <th style={{ width: "20%" }}>Владелец</th>
                                        <th style={{ width: "20%" }}>Кол-во мест</th>
                                        <th style={{ width: "20%" }}>Цена</th>
                                        <th style={{ width: "20%" }}>Дата</th>
                                        <th style={{ width: "10%" }}>Кол-во свободных мест</th>
                                        <th style={{ width: "10%" }}></th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    {gamesDetails}
                                    </tbody>
                                </table>
                            </div>
                            <Link to="/admin" className="btn btn-primary mt-3">Назад</Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Games;



