import React, { useEffect, useState } from "react";
import { Link } from 'react-router-dom'
import axios from 'axios'
import Loading from "../components/Loading";


function Games() {

    const [loading, setLoading] = useState(true);
    const [games, setGames] = useState([]);

    useEffect(() => {

        axios.get('http://localhost:8080/games').then(res => {
            console.log(res)
            setGames(res.data)
            setLoading(false)
        });

    }, [])

    if (loading) {
        return (
            <Loading />
        )
    }

    var gamesDetails = "";

    gamesDetails = games.map((item, index) => {
        return (
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
        )
    })

    return (
        <div className="container mt-5">
            <div className="row">
                <div className="col-md-12">
                    <div className="card">
                        <div className="card-header">
                            <h4>Players List
                                <Link to="/games/create" className="btn btn-primary float-end">Add Game</Link>
                            </h4>
                        </div>
                        <div className="card-body">
                            <table className='table table-striped'>
                                <thead>
                                    <tr>
                                        <th>ID</th>
                                        <th>Date</th>
                                        <th>Owner</th>
                                        <th>Fields</th>
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
    )
}

export default Games;