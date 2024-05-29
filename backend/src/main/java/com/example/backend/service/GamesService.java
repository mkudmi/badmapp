package com.example.backend.service;

import com.bdb.badmapp.jooq.sample.model.tables.pojos.Games;
import org.jooq.DSLContext;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

import static com.bdb.badmapp.jooq.sample.model.Tables.GAMES;
import static com.bdb.badmapp.jooq.sample.model.tables.UsersGames.USERS_GAMES;

@Service
public class GamesService {

    private final DSLContext dsl;

    @Autowired
    public GamesService(DSLContext dsl) {
        this.dsl = dsl;
    }

    /**
     * Получить все игры, с возможностью фильтрации по актуальным играм.
     *
     * @param isActual true, если нужны только актуальные игры; false, если нужны все игры.
     * @return Список игр.
     */
    public List<Games> getAllGames(boolean isActual) {
        LocalDateTime now = LocalDateTime.now();

        // Основной запрос для получения всех игр
        var query = dsl.selectFrom(GAMES);
        if (isActual) {
            query.where(GAMES.DATE.greaterThan(now));
        }

        // Получаем все игры (учитывая фильтрацию по актуальности)
        List<Games> allGames = query.orderBy(GAMES.DATE.desc()).fetchInto(Games.class);

        // Создаем список для игр с доступными местами
        List<Games> availableGames = new ArrayList<>();

        for (Games game : allGames) {
            // Получаем количество зарегистрированных пользователей для текущей игры
            Integer registeredUsers = dsl.selectCount()
                    .from(USERS_GAMES)
                    .where(USERS_GAMES.DATE.eq(game.getDate()))
                    .fetchOne(0, int.class);

            // Если количество зарегистрированных пользователей меньше чем количество мест, добавляем игру в список
            if (registeredUsers < game.getPlaces()) {
                availableGames.add(game);
            }
        }

        return availableGames;
    }

    /**
     * Получить игры по владельцу.
     *
     * @param owner Имя владельца.
     * @return Список игр, принадлежащих указанному владельцу.
     */
    public List<Games> getGamesByOwner(String owner) {
        return dsl.selectFrom(GAMES)
                .where(GAMES.OWNER.likeIgnoreCase('%' + owner + '%'))
                .orderBy(GAMES.DATE.desc())
                .fetchInto(Games.class);
    }

    /**
     * Вставить новую игру.
     *
     * @param games Объект игры.
     */
    public void insertNewGame(Games games) {
        long places = games.getFields() * 4;
        dsl.insertInto(GAMES, GAMES.ID, GAMES.DATE, GAMES.OWNER, GAMES.FIELDS, GAMES.PLACES, GAMES.PRICE)
                .values(games.getId(), games.getDate(), games.getOwner(), games.getFields(), places, games.getPrice())
                .execute();
    }

    /**
     * Обновить существующую игру по ID.
     *
     * @param updatedGame Обновлённый объект игры.
     * @param id ID игры, которую необходимо обновить.
     */
    public void updateGame(Games updatedGame, Integer id) {
        dsl.update(GAMES)
                .set(GAMES.DATE, updatedGame.getDate())
                .set(GAMES.OWNER, updatedGame.getOwner())
                .set(GAMES.FIELDS, updatedGame.getFields())
                .set(GAMES.PRICE, updatedGame.getPrice())
                .where(GAMES.ID.eq(id))
                .execute();
    }

    /**
     * Удалить игру по ID.
     *
     * @param id ID игры, которую необходимо удалить.
     */
    public void deleteGame(Integer id) {
        dsl.deleteFrom(GAMES).where(GAMES.ID.eq(id)).execute();
    }

    /**
     * Получить количество свободных мест на указанную дату.
     *
     * @param date Дата, на которую нужно узнать количество свободных мест.
     * @return Количество свободных мест.
     */
    public int getAvailablePlaces(LocalDateTime date) {
        // Получить количество мест для указанной даты
        Integer totalPlaces = dsl.select(GAMES.PLACES)
                .from(GAMES)
                .where(GAMES.DATE.eq(date))
                .fetchOneInto(Integer.class);

        if (totalPlaces == null) {
            throw new IllegalArgumentException("No game found for the specified date.");
        }

        // Получить количество зарегистрированных пользователей для указанной даты
        Integer registeredUsers = dsl.selectCount()
                .from(USERS_GAMES)
                .where(USERS_GAMES.DATE.eq(date))
                .fetchOne(0, int.class);

        // Вычислить количество свободных мест
        return totalPlaces - registeredUsers;
    }
}

