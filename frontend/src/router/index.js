import React from "react";
import { Routes, Route } from 'react-router-dom'
import Home from '../pages/HomePage/Home.js'
import Games from '../pages/Games/Games.js'
import OwnerLogin from "../pages/OwnerLogin/OwnerLogin.js"
import GamesReg from "../pages/GamesReg/GamesReg.js"
import AdminPanel from "../pages/AdminPanel/AdminPanel.js";
import GameCreate from "../pages/Games/GamesCreate.js";
import OwnerRegistration from "../pages/OwnerLogin/OwnerRegistration.js";

function MyRouter() {

    return (
        <Routes>
            <Route path='/' element={<Home />} />

            <Route path='/games/reg' element={<GamesReg />} />
            <Route path='/login' element={<OwnerLogin />} />
            <Route path="/register" element={<OwnerRegistration />} />

            <Route path='/admin' element={<AdminPanel />} />

            <Route path='/games/info' element={<Games />} />
            <Route path='/games/create' element={<GameCreate />} />
        </Routes>
    )
}

export default MyRouter;
