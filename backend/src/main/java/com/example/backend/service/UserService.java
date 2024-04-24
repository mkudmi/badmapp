package com.example.backend.service;

import com.bdb.badmapp.jooq.sample.model.tables.pojos.Users;
import org.jooq.DSLContext;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.ResponseStatus;

import java.util.List;

import static com.bdb.badmapp.jooq.sample.model.Tables.USERS;

@Service
public class UserService {

    private final DSLContext dsl;

    @Autowired
    public UserService(DSLContext dsl) {
        this.dsl = dsl;
    }

    @ResponseStatus(HttpStatus.BAD_REQUEST)
    public static class UserNotFoundException extends RuntimeException {
        public UserNotFoundException(String message) {
            super(message);
        }
    }

    public Users getUserById(Integer id) {
        Users user = dsl.selectFrom(USERS)
                .where(USERS.ID.eq(id))
                .fetchOneInto(Users.class);
        if (user == null) {
            throw new UserNotFoundException("Пользователь с id " + id + " не найден");
        }
        return user;
    }

    public List<Users> getAllUsers() {
        return dsl.selectFrom(USERS)
                .orderBy(USERS.ID.asc())
                .fetchInto(Users.class);
    }

    public void insertNewUser(Users users) {
        dsl.insertInto(USERS, USERS.ID, USERS.NAME, USERS.EMAIL, USERS.STATUS)
                .values(users.getId(), users.getName(), users.getEmail(), users.getStatus())
                .execute();
    }

    public void updateUser(Users updatedUser, Integer id) {
        dsl.update(USERS)
                .set(USERS.NAME, updatedUser.getName())
                .set(USERS.EMAIL, updatedUser.getEmail())
                .set(USERS.STATUS, updatedUser.getStatus())
                .where(USERS.ID.eq(id))
                .execute();
    }

    public void deleteUser(Integer id) {
        dsl.deleteFrom(USERS).where(USERS.ID.eq(id)).execute();
    }
}
