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
}
