package com.example.backend.service;

import com.bdb.badmapp.jooq.sample.model.tables.pojos.UsersGames;
import org.jooq.DSLContext;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import static com.bdb.badmapp.jooq.sample.model.Tables.USERS_GAMES;

@Service
public class GamesRegService {

    private final DSLContext dsl;

    @Autowired
    public GamesRegService(DSLContext dsl) {
        this.dsl = dsl;
    }

    public void insertUserToGame(UsersGames usersGames) {
        dsl.insertInto(USERS_GAMES, USERS_GAMES.FIRST_NAME, USERS_GAMES.LAST_NAME, USERS_GAMES.DATE)
                .values(usersGames.getFirstName(), usersGames.getLastName(), usersGames.getDate())
                .execute();
    }
}
