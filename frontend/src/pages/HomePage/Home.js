import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./Home.css";

function Home() {

    return (
        <div className="home-container">
            <h1>Home Page</h1>
            <div className="button-container">
                <button className="registration-button" onClick={() => console.log("Регистрация на игру")}>Регистрация на игру</button>
                <Link to="/owner/login" className="login-button">Вход для владельцев</Link>
            </div>
        </div>
    );
}

export default Home;

