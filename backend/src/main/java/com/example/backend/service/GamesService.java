package com.example.backend.service;

import com.bdb.badmapp.jooq.sample.model.tables.pojos.Games;
import org.jooq.DSLContext;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

import static com.bdb.badmapp.jooq.sample.model.Tables.GAMES;

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
        if (isActual) {
            return dsl.selectFrom(GAMES)
                    .where(GAMES.DATE.greaterThan(LocalDateTime.now()))
                    .orderBy(GAMES.DATE.desc())
                    .fetchInto(Games.class);
        } else {
            return dsl.selectFrom(GAMES)
                    .orderBy(GAMES.DATE.desc())
                    .fetchInto(Games.class);
        }
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
        dsl.insertInto(GAMES, GAMES.ID, GAMES.DATE, GAMES.OWNER, GAMES.FIELDS, GAMES.PLACES)
                .values(games.getId(), games.getDate(), games.getOwner(), games.getFields(), places)
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
}

