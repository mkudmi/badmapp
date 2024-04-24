package com.example.backend.service;

import com.bdb.badmapp.jooq.sample.model.tables.pojos.Games;
import org.jooq.DSLContext;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

import static com.bdb.badmapp.jooq.sample.model.Tables.GAMES;

@Service
public class GamesService {

    private final DSLContext dsl;

    @Autowired
    public GamesService(DSLContext dsl) {
        this.dsl = dsl;
    }

    public List<Games> getAllGames() {
        return dsl.selectFrom(GAMES)
                .orderBy(GAMES.DATE.desc())
                .fetchInto(Games.class);
    }

    public void insertNewGame(Games games) {
        dsl.insertInto(GAMES, GAMES.ID, GAMES.DATE, GAMES.OWNER, GAMES.FIELDS)
                .values(games.getId(), games.getDate(), games.getOwner(), games.getFields())
                .execute();
    }

    public void updateGame(Games updatedGame, Integer id) {
        dsl.update(GAMES)
                .set(GAMES.DATE, updatedGame.getDate())
                .set(GAMES.OWNER, updatedGame.getOwner())
                .set(GAMES.FIELDS, updatedGame.getFields())
                .where(GAMES.ID.eq(id))
                .execute();
    }

    public void deleteGame(Integer id) {
        dsl.deleteFrom(GAMES).where(GAMES.ID.eq(id)).execute();
    }
}
