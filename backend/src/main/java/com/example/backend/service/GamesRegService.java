package com.example.backend.service;

import com.bdb.badmapp.jooq.sample.model.tables.pojos.UsersGames;
import org.jooq.DSLContext;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.time.LocalDateTime;
import java.util.List;

import static com.bdb.badmapp.jooq.sample.model.Tables.GAMES;
import static com.bdb.badmapp.jooq.sample.model.Tables.USERS_GAMES;

@Service
public class GamesRegService {

    private final DSLContext dsl;

    @Autowired
    public GamesRegService(DSLContext dsl) {
        this.dsl = dsl;
    }

    public void insertUserToGame(UsersGames usersGames) {
        // Получаем количество мест из таблицы games для заданной даты
        Integer availablePlaces = dsl.select(GAMES.PLACES)
                .from(GAMES)
                .where(GAMES.DATE.eq(usersGames.getDate()))
                .fetchOneInto(Integer.class);

        if (availablePlaces == null) {
            throw new IllegalArgumentException("No game found for the specified date.");
        }

        // Получаем количество уже зарегистрированных пользователей для этой даты
        Integer registeredUsers = dsl.selectCount()
                .from(USERS_GAMES)
                .where(USERS_GAMES.DATE.eq(usersGames.getDate()))
                .fetchOne(0, int.class);

        // Проверяем, есть ли доступные места
        if (registeredUsers < availablePlaces) {
            // Если есть доступные места, регистрируем пользователя
            dsl.insertInto(USERS_GAMES, USERS_GAMES.FIRST_NAME, USERS_GAMES.LAST_NAME, USERS_GAMES.DATE)
                    .values(usersGames.getFirstName(), usersGames.getLastName(), usersGames.getDate())
                    .execute();
        } else {
            // Если мест нет, выбрасываем исключение с HTTP статусом 400
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Мест в выбранной игре больше нет");
        }
    }

    public void deleteUserFromGame(String firstName, String lastName, LocalDateTime date) {
        // Проверяем, есть ли запись в таблице users_games для заданного имени, фамилии и даты
        int userCount = dsl.selectCount()
                .from(USERS_GAMES)
                .where(USERS_GAMES.FIRST_NAME.equalIgnoreCase(firstName))
                .and(USERS_GAMES.LAST_NAME.equalIgnoreCase(lastName))
                .and(USERS_GAMES.DATE.eq(date))
                .fetchOne(0, int.class);

        if (userCount > 0) {
            // Если запись существует, удаляем её
            dsl.deleteFrom(USERS_GAMES)
                    .where(USERS_GAMES.FIRST_NAME.equalIgnoreCase(firstName))
                    .and(USERS_GAMES.LAST_NAME.equalIgnoreCase(lastName))
                    .and(USERS_GAMES.DATE.eq(date))
                    .execute();
        } else {
            // Если записи не существует, выбрасываем исключение с HTTP статусом 404
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Пользователь не найден для указанной даты.");
        }
    }

    public List<UsersGames> getUsersFromGame(LocalDateTime date) {
        return dsl.selectFrom(USERS_GAMES)
                .where(USERS_GAMES.DATE.eq(date))
                .fetchInto(UsersGames.class);
    }
}

