import React, { useEffect, useState } from "react";
import { Link } from 'react-router-dom';
import axios from 'axios';
import Loading from "../Loading";
import "./styles.css";

function Games() {
    const [loading, setLoading] = useState(true);
    const [games, setGames] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:8080/games').then(res => {
            setGames(res.data);
            setLoading(false);
        });
    }, []);

    if (loading) {
        return <Loading />;
    }

    const gamesDetails = games.map((item, index) => (
        <tr key={index}>
            <td>{item.id}</td>
            <td>{item.date}</td>
            <td>{item.owner}</td>
            <td>{item.fields}</td>
            <td>
                <Link to="/" className="btn btn-success">Edit</Link>
            </td>
            <td>
                <button className="btn btn-danger">Delete</button>
            </td>
        </tr>
    ));

    return (
        <div className="container mt-5">
            <div className="row">
                <div className="col-md-12">
                    <div className="card">
                        <div className="card-header">
                            <h4>Players List
                                <Link to="/games/create" className="btn btn-primary float-end">Add Game</Link>
                                <Link to="/admin" className="btn btn-primary float-end">Back</Link>
                            </h4>
                        </div>
                        <div className="card-body">
                            <div className="table-container">
                                <table className='table table-striped'>
                                    <thead>
                                        <tr>
                                            <th style={{ width: "20%" }}>ID</th>
                                            <th style={{ width: "20%" }}>Date</th>
                                            <th style={{ width: "20%" }}>Owner</th>
                                            <th style={{ width: "20%" }}>Fields</th>
                                            <th style={{ width: "10%" }}>Actions</th>
                                            <th style={{ width: "10%" }}></th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {gamesDetails}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Games;


