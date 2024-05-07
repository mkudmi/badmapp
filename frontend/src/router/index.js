import React from "react";
import { Routes, Route } from 'react-router-dom'
import Home from '../pages/HomePage/Home.js'
import About from '../pages/About.js'
import Games from '../pages/Games.js'
import PlayerList from "../pages/Players.js"
import PlayerCreate from "../pages/PlayerCreate.js"
import PlayerEdit from "../pages/PlayerEdit.js"
import OwnerLogin from "../pages/OwnerLogin/OwnerLogin.js";

function MyRouter() {

    return (
        <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/about-us' element={<About />} />
            <Route path='/games' element={<Games />} />
            <Route path='/players' element={<PlayerList />} />
            <Route path='/players/create' element={<PlayerCreate />} />
            <Route path='/player/:id/edit' element={<PlayerEdit />} />

            <Route path='/owner/login' element={<OwnerLogin />} />
        </Routes>
    )
}

export default MyRouter;
