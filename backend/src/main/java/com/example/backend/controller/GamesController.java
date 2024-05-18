package com.example.backend.controller;

import com.bdb.badmapp.jooq.sample.model.tables.pojos.Games;
import com.example.backend.service.GamesService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/games")
@CrossOrigin(origins = "http://localhost:3000")
public class GamesController {

    private final GamesService gamesService;

    @Autowired
    public GamesController(GamesService gamesService) {
        this.gamesService = gamesService;
    }

    /**
     * Получить все игры с возможностью фильтрации по актуальности.
     *
     * @param isActual true, если нужны только актуальные игры; false, если нужны все игры.
     * @return Список игр.
     */
    @GetMapping
    public List<Games> getAllGames(@RequestParam(name = "is_actual", required = false, defaultValue = "false") boolean isActual) {
        return gamesService.getAllGames(isActual);
    }

    /**
     * Получить игры по владельцу.
     *
     * @param owner Имя владельца.
     * @return Список игр, принадлежащих указанному владельцу.
     */
    @GetMapping("/by-owner")
    public List<Games> getGamesByOwner(@RequestParam String owner) {
        return gamesService.getGamesByOwner(owner);
    }

    /**
     * Добавить новую игру.
     *
     * @param game Объект игры.
     * @return Сообщение о результате операции.
     */
    @PostMapping
    public String addGame(@RequestBody Games game) {
        gamesService.insertNewGame(game);
        return "Game added";
    }

    /**
     * Обновить существующую игру по ID.
     *
     * @param id ID игры.
     * @param game Обновлённый объект игры.
     * @return Сообщение о результате операции.
     */
    @PutMapping("/{id}")
    public String updateGame(@PathVariable Integer id, @RequestBody Games game) {
        gamesService.updateGame(game, id);
        return "Game updated";
    }

    /**
     * Удалить игру по ID.
     *
     * @param id ID игры.
     * @return Сообщение о результате операции.
     */
    @DeleteMapping("/{id}")
    public String deleteGame(@PathVariable Integer id) {
        gamesService.deleteGame(id);
        return "Game deleted";
    }
}

