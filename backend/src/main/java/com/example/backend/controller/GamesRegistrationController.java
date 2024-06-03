package com.example.backend.controller;

import com.bdb.badmapp.jooq.sample.model.tables.pojos.UsersGames;
import com.example.backend.service.GamesRegService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.List;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
public class GamesRegistrationController {

    private static final DateTimeFormatter DATE_TIME_FORMATTER = DateTimeFormatter.ofPattern("yyyy-MM-dd'T'HH:mm:ss");

    private final GamesRegService gamesRegService;

    @Autowired
    public GamesRegistrationController(GamesRegService gamesRegService) {
        this.gamesRegService = gamesRegService;
    }

    /**
     * Добавить пользователя в игру.
     *
     * @param usersGames Данные пользователя и дата игры.
     * @return Сообщение о результате операции.
     */
    @PostMapping("/user_to_game")
    public String addUserToGame(@RequestBody UsersGames usersGames) {
        gamesRegService.insertUserToGame(usersGames);
        return "User added";
    }

    /**
     * Удалить пользователя из игры.
     *
     * @param firstName Имя пользователя.
     * @param lastName  Фамилия пользователя.
     * @param date      Дата игры в формате yyyy-MM-dd'T'HH:mm:ss.
     * @return Сообщение о результате операции.
     */
    @DeleteMapping("/user_from_game")
    public String deleteUserFromGame(
            @RequestParam String firstName,
            @RequestParam String lastName,
            @RequestParam String date) {
        LocalDateTime dateTime = LocalDateTime.parse(date, DATE_TIME_FORMATTER);
        gamesRegService.deleteUserFromGame(firstName, lastName, dateTime);
        return "User removed from game";
    }

    /**
     * Запросить пользователей из игры.
     *
     * @param date      Дата игры в формате yyyy-MM-dd'T'HH:mm:ss.
     * @return Сообщение о результате операции.
     */
    @GetMapping("/users_from_game")
    public List<UsersGames> getAllUsersFromGame(
            @RequestParam LocalDateTime date
    ) {
        return gamesRegService.getUsersFromGame(date);
    }

    /**
     * Обработчик исключений ResponseStatusException.
     *
     * @param ex Исключение.
     * @return Сообщение об ошибке.
     */
    @ExceptionHandler(ResponseStatusException.class)
    @ResponseStatus(HttpStatus.BAD_REQUEST)
    public String handleResponseStatusException(ResponseStatusException ex) {
        return ex.getReason();
    }
}

