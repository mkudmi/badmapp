import React from "react";
import {Link} from "react-router-dom";
import "./styles.css";

function Home() {
    return (
        <div className="container home-container">
            <h1>Badminton</h1>
            <div className="button-container-vertical">
                <Link to="/games/reg" className="button registration-button">Регистрация на игру</Link>
                <Link to="/games/unreg" className="button unreg-button">Сняться с регистрации</Link>
                <Link to="/login" className="button login-button">Вход для владельцев</Link>
            </div>
        </div>
    );
}

export default Home;

