package com.example.backend.service;

import com.bdb.badmapp.jooq.sample.model.tables.pojos.Owners;
import org.jooq.DSLContext;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

import static com.bdb.badmapp.jooq.sample.model.tables.Owners.OWNERS;

@Service
public class OwnerService {

    private final DSLContext dsl;

    @Autowired
    public OwnerService(DSLContext dsl) {
        this.dsl = dsl;
    }

    public boolean checkOwner(String login, String pass) {
        int count = dsl.selectCount()
                .from(OWNERS)
                .where(OWNERS.LOGIN.eq(login)
                        .and(OWNERS.PASS.eq(pass)))
                .fetchOneInto(int.class);
        return count == 1;
    }

    public Owners getOwnerById(Integer id) {
        return dsl.selectFrom(OWNERS)
                .where(OWNERS.ID.eq(id))
                .fetchOneInto(Owners.class);
    }

    public List<Owners> getAllOwners() {
        return dsl.selectFrom(OWNERS)
                .fetchInto(Owners.class);
    }

    public void insertNewOwner(Owners owners) {
        dsl.insertInto(OWNERS, OWNERS.ID, OWNERS.LOGIN, OWNERS.PASS)
                .values(owners.getId(), owners.getLogin(), owners.getPass())
                .execute();
    }

    public void updateOwner(Owners updatedOwner, Integer id) {
        dsl.update(OWNERS)
                .set(OWNERS.LOGIN, updatedOwner.getLogin())
                .set(OWNERS.PASS, updatedOwner.getPass())
                .where(OWNERS.ID.eq(id))
                .execute();
    }

    public void deleteOwner(Integer id) {
        dsl.deleteFrom(OWNERS).where(OWNERS.ID.eq(id))
                .execute();
    }
}
