import React, { useEffect, useState } from "react";
import { Link } from 'react-router-dom'
import axios from 'axios'
import Loading from "../components/Loading";


function Player() {

    const [loading, setLoading] = useState(true);
    const [players, setPlayers] = useState([]);

    useEffect(() => {
        
        axios.get('http://localhost:8080/users').then(res => {
            console.log(res)
            setPlayers(res.data)
            setLoading(false)
        });

    }, [])

    if(loading) {
        return (
            <Loading />
        )
    }
    
    var playerDetails = "";

    playerDetails = players.map((item, index) => {
        return(
            <tr key={index}>
                <td>{item.id}</td>
                <td>{item.name}</td>
                <td>{item.email}</td>
                <td>{item.status}</td>
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
                                <Link to="/" className="btn btn-primary float-end">Add Player</Link>
                            </h4>
                        </div>
                        <div className="card-body">
                            <table className='table table-striped'>
                                <thead>
                                    <tr>
                                        <th>ID</th>
                                        <th>Name</th>
                                        <th>Email</th>
                                        <th>Status</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {playerDetails}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Player;