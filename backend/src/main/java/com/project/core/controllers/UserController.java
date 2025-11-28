package com.project.core.controllers;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.project.core.dto.LoginRequest;
import com.project.core.entities.User;
import com.project.core.services.JWTService;
import com.project.core.services.UserService;

@RestController
@RequestMapping("/users")
public class UserController {

    @Autowired
    private UserService userService;

    @Autowired
    private JWTService jwtService;

    @GetMapping("")
    public ResponseEntity<List<User>> getUsers(){
        return ResponseEntity.ok(userService.getUsers());
    }

    @GetMapping("/{userID}")
    public ResponseEntity<?> getUser(@PathVariable String userID) {
        var map = new HashMap<String, Object>();
        var user = userService.getUserByID(userID);
        if (user == null){
            map.putAll(Map.of(
                "type", "error",
                "message", "Utilisateur inexistant"
            ));
            return ResponseEntity.status(404).body(map);
        }

        map.putAll(Map.of(
            "type", "success",
            "message", "Utilisateur trouvé",
            "user", user
        ));
        return ResponseEntity.ok(map);
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginRequest loginRequest){
        var map = new HashMap<String, Object>();
        var user = userService.getUserByEmail(loginRequest.getEmail());
        var result = userService.login(user.getEmail(), user.getPassword());
        switch (result){
            case "Utilisateur inexistant !" -> {
                map.putAll(Map.of(
                        "type", "error",
                        "message", result
                ));
                return ResponseEntity.status(404).body(map);
            }
            case "Mot de passe incorrect" -> {
                map.putAll(Map.of(
                        "type", "error",
                        "message", result
                ));
                return ResponseEntity.status(404).body(map);
            }
            default -> {
                map.putAll(Map.of(
                        "type", "success",
                        "message", result,
                        "userID", user.getId()
                ));
                return ResponseEntity.ok(map);
            }
        }
    }

    @PostMapping("/create")
    public ResponseEntity<?> createUser(@RequestBody User user) {
        var map = new HashMap<String, Object>();

        if(user == null){
            map.putAll(Map.of(
                "type", "error",
                "message", "Object user can't be null"
            ));
            return ResponseEntity.status(400).body(map);
        }

        if (user.getEmail().trim().isEmpty()){
            map.putAll(Map.of(
                "type", "error",
                "message", "Email can't be null"
            ));
            return ResponseEntity.status(400).body(map);
        }

        var existingUser = userService.getUserByEmail(user.getEmail());
        if (existingUser != null){
            map.putAll(Map.of(
                "type", "error",
                "message", "User already exists !"
            ));
            return ResponseEntity.status(409).body(map);
        }

        if(user.getPassword().equals("")){
            map.putAll(Map.of(
                "type", "error",
                "message", "Password can't be null"
            ));
            return ResponseEntity.status(400).body(map);
        }

        if(user.getFirstname().equals("")
            || user.getLastname().equals("")
        ) {
            map.putAll(Map.of(
                "type", "error",
                "message", "Names can't be empty"
            ));
            return ResponseEntity.status(400).body(map);
        }

        var newUser = userService.createUser(user);
        String generatedToken = jwtService.generateToken(
            newUser.getId(), 
            newUser.getEmail(),
            newUser.getFirstname(),
            newUser.getLastname()
        );
        map.putAll(Map.of(
            "type", "success",
            "message", "Votre compte a été créé",
            "token", generatedToken,
            "userID", newUser.getId()
        ));
        return ResponseEntity.status(201).body(map);
    }

    @DeleteMapping("/delete")
    public ResponseEntity<?> deleteUser(@RequestParam String userID){
        var map = new HashMap<String, Object>();
        User user = userService.getUserByID(userID);

        if(user == null){
            map.putAll(Map.of(
                "type", "error",
                "message", "User doesn't event exist"
            ));
            return ResponseEntity.status(404).body(map);
        }

        userService.deleteUser(user);
        map.putAll(Map.of(
            "type", "success",
            "message", "Votre compte a été supprimé avec succès"
        ));
        return ResponseEntity.ok(map);
    }
}