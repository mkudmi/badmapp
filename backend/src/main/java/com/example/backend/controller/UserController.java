package com.example.backend.controller;

import com.example.backend.service.UserService;
import com.tej.JooQDemo.jooq.sample.model.tables.pojos.Users;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
public class UserController {

    @Autowired
    UserService userService;

    @CrossOrigin(origins = "http://localhost:3000")
    @GetMapping("/user")
    public Users getUserById(@RequestParam Integer id) {
        return userService.getUserById(id);
    }

    @CrossOrigin(origins = "http://localhost:3000")
    @GetMapping("/users")
    public List<Users> getAllUsers() {
        return userService.getAllUsers();
    }

    @CrossOrigin(origins = "http://localhost:3000")
    @PostMapping("user")
    public String addUser(@RequestBody Users users) {
        userService.insertNewUser(users);
        return "user added";
    }

    @CrossOrigin(origins = "http://localhost:3000")
    @PutMapping("user")
    public String updateUser(@RequestParam Integer id, @RequestBody Users users) {
        userService.updateUser(users, id);
        return "user updated";
    }

    @CrossOrigin(origins = "http://localhost:3000")
    @DeleteMapping("user")
    public String deleteUser(@RequestParam Integer id) {
        userService.deleteUser(id);
        return "user deleted";
    }
}

