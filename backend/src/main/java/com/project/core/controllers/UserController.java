package com.project.core.controllers;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/users")
public class UserController {

    @GetMapping("")
    public ResponseEntity<List<String>> getUsers(){
        var users = List.of("Adrien", "Lucien", "Marin");
        return ResponseEntity.ok(users);
    }

}
