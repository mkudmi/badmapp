package com.example.backend.service;

import com.bdb.badmapp.jooq.sample.model.tables.pojos.Owners;
import org.jooq.DSLContext;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;

import static com.bdb.badmapp.jooq.sample.model.tables.Owners.OWNERS;

@Service
public class OwnerService {

    private final DSLContext dsl;
    private final PasswordEncoder passwordEncoder;

    @Autowired
    public OwnerService(DSLContext dsl) {
        this.dsl = dsl;
        this.passwordEncoder = new BCryptPasswordEncoder();
    }

    /**
     * Проверка наличия владельца по логину и паролю.
     *
     * @param login Логин владельца.
     * @param pass  Пароль владельца.
     * @return true, если владелец найден; false в противном случае.
     */
    public boolean checkOwner(String login, String pass) {
        Owners owner = dsl.selectFrom(OWNERS)
                .where(OWNERS.LOGIN.eq(login))
                .fetchOneInto(Owners.class);

        if (owner == null) {
            return false;
        }

        return passwordEncoder.matches(pass, owner.getPass());
    }

    /**
     * Получение владельца по его ID.
     *
     * @param id ID владельца.
     * @return Объект владельца.
     */
    public Owners getOwnerById(Integer id) {
        return dsl.selectFrom(OWNERS)
                .where(OWNERS.ID.eq(id))
                .fetchOneInto(Owners.class);
    }

    /**
     * Получение списка всех владельцев.
     *
     * @return Список владельцев.
     */
    public List<Owners> getAllOwners() {
        return dsl.selectFrom(OWNERS)
                .fetchInto(Owners.class);
    }

    /**
     * Вставка нового владельца.
     *
     * @param owner Объект владельца.
     */
    public void insertNewOwner(Owners owner) {
        String hashedPassword = passwordEncoder.encode(owner.getPass());
        dsl.insertInto(OWNERS)
                .set(OWNERS.NAME, owner.getName())
                .set(OWNERS.SURNAME, owner.getSurname())
                .set(OWNERS.LOGIN, owner.getLogin())
                .set(OWNERS.PASS, hashedPassword)
                .execute();
    }

    /**
     * Обновление существующего владельца.
     *
     * @param updatedOwner Обновлённый объект владельца.
     * @param id           ID владельца, которого необходимо обновить.
     */
    public void updateOwner(Owners updatedOwner, Integer id) {
        String hashedPassword = passwordEncoder.encode(updatedOwner.getPass());
        dsl.update(OWNERS)
                .set(OWNERS.LOGIN, updatedOwner.getLogin())
                .set(OWNERS.PASS, hashedPassword)
                .where(OWNERS.ID.eq(id))
                .execute();
    }

    /**
     * Удаление владельца по ID.
     *
     * @param id ID владельца, которого необходимо удалить.
     */
    public void deleteOwner(Integer id) {
        dsl.deleteFrom(OWNERS)
                .where(OWNERS.ID.eq(id))
                .execute();
    }
}

