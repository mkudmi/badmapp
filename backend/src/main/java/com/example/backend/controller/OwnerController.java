package com.example.backend.controller;

import com.bdb.badmapp.jooq.sample.model.tables.pojos.Owners;
import com.example.backend.model.LoginReq;
import com.example.backend.service.OwnerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

import static org.springframework.http.ResponseEntity.*;

@RestController
public class OwnerController {

    @Autowired
    OwnerService ownerService;

    @CrossOrigin(origins = "http://localhost:3000")
    @PostMapping("/login")
    public ResponseEntity<String> login(@RequestBody LoginReq loginRequest) {
        String username = loginRequest.getLogin();
        String password = loginRequest.getPass();

        if (ownerService.checkOwner(username, password)) {
            return ok("Success"); // Если логин и пароль верны
        } else {
            return status(HttpStatus.BAD_REQUEST).body("Error: Invalid credentials");
        }
    }

    @CrossOrigin(origins = "http://localhost:3000")
    @GetMapping("/owner")
    public Owners getOwnerById(@RequestParam Integer id) {
        return ownerService.getOwnerById(id);
    }

    @CrossOrigin(origins = "http://localhost:3000")
    @GetMapping("/owners")
    public List<Owners> getAllOwners() {
        return ownerService.getAllOwners();
    }

    @CrossOrigin(origins = "http://localhost:3000")
    @PostMapping("owner")
    public String addOwner(@RequestBody Owners owners) {
        ownerService.insertNewOwner(owners);
        return "owner added";
    }

    @CrossOrigin(origins = "http://localhost:3000")
    @PutMapping("owner")
    public String updateOwner(@RequestParam Integer id, @RequestBody Owners owners) {
        ownerService.updateOwner(owners, id);
        return "user updated";
    }

    @CrossOrigin(origins = "http://localhost:3000")
    @DeleteMapping("owner")
    public String deleteOwner(@RequestParam Integer id) {
        ownerService.deleteOwner(id);
        return "owner deleted";
    }
}
