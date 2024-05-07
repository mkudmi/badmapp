import { Link, useParams, useNavigate } from 'react-router-dom'
import React, { useEffect, useState } from 'react';
import axios from 'axios';

function PlayerEdit() {

    const navigate = useNavigate();
    let { id } = useParams();
    const idInt = parseInt(id);

    const [player, setPlayer] = useState({})

    useEffect(() => {
        const idInt = parseInt(id);
        axios.get(`http://localhost:8080/user?id=${idInt}`).then(res => {
            console.log(res)
            setPlayer(res.data)
        });
    }, [id])

    const handleInput = (e) => {
        e.persist();
        setPlayer({ ...player, [e.target.name]: e.target.value });
    }

    const updatePlayer = (e) => {
        e.preventDefault();

        const data = {
            name: player.name,
            email: player.email,
            status: player.status
        }
        const idInt = parseInt(id);
        axios.put(`http://localhost:8080/user?id=${idInt}`, data)
            .then(res => {
                console.log(res)
                navigate('/players')
            })
    }

    return (
        <div>
            <div className="container mt-5">
                <div className="row">
                    <div className="col-md-12">
                        <div className="card">
                            <div className="card-header">
                                <h4>Edit Player
                                    <Link to="/players" className="btn btn-danger float-end">Back</Link>
                                </h4>
                            </div>
                            <div className="card-body">
                                <form onSubmit={updatePlayer}>
                                    <div className='mb-3'>
                                        <label>Name</label>
                                        <input type='text' name='name' value={player.name} onChange={handleInput} className='form-control' />
                                    </div>
                                    <div className='mb-3'>
                                        <label>Email</label>
                                        <input type='text' name='email' value={player.email} onChange={handleInput} className='form-control' />
                                    </div>
                                    <div className='mb-3'>
                                        <label>Status</label>
                                        <input type='text' name='status' value={player.status} onChange={handleInput} className='form-control' />
                                    </div>
                                    <div className='mb-3'>
                                        <button type='submit' className='btn btn-primary'>save</button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default PlayerEdit;