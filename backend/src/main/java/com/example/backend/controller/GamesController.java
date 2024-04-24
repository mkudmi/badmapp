package com.example.backend.controller;

import com.example.backend.service.GamesService;
import com.tej.JooQDemo.jooq.sample.model.tables.pojos.Games;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

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
