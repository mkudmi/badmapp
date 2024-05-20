import React from "react";
import { Link } from "react-router-dom";
import "./Home.css";

function Home() {

    return (
        <div className="home-container">
            <h1>Badminton</h1>
            <div className="button-container">
                <Link to="/games/reg" className="registration-button">Регистрация на игру</Link>
                <Link to="/games/unreg" className="unreg-button">Сняться с регистрации</Link>
                <Link to="/owner/login" className="login-button">Вход для владельцев</Link>
            </div>
        </div>
    );
}

export default Home;
