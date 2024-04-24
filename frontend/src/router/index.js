import React from "react";
import { Routes, Route } from 'react-router-dom'
import Home from '../pages/Home.js'
import About from '../pages/About.js'
import Games from '../pages/Games.js'
import PlayerList from "../pages/Players.js"
import PlayerCreate from "../pages/PlayerCreate.js"

function MyRouter() {

    return (
        <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/about-us' element={<About />} />
            <Route path='/games' element={<Games />} />
            <Route path='/players' element={<PlayerList />} />
            <Route path='/players/create' element={<PlayerCreate />} />
        </Routes>
    )
}

export default MyRouter;
