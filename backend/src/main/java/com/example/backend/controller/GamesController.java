package com.example.backend.controller;

import com.bdb.badmapp.jooq.sample.model.tables.pojos.Games;
import com.example.backend.service.GamesService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
public class GamesController {

    @Autowired
    GamesService gamesService;

    @CrossOrigin(origins = "http://localhost:3000")
    @GetMapping("/games")
    public List<Games> getAllUsers() {
        return gamesService.getAllGames();
    }
}
