package com.example.backend.controller;

import com.bdb.badmapp.jooq.sample.model.tables.pojos.Games;
import com.bdb.badmapp.jooq.sample.model.tables.pojos.UsersGames;
import com.example.backend.service.GamesRegService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class GamesRegistrationController {

    @Autowired
    GamesRegService gamesRegService;

    @CrossOrigin(origins = "http://localhost:3000")
    @PostMapping("user_to_game")
    public String addUserToGame(@RequestBody UsersGames usersGames) {
        gamesRegService.insertUserToGame(usersGames);
        return "user added";
    }
}
