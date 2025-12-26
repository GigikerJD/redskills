package com.project.core.controllers;

import java.time.LocalDate;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.project.core.dto.request.LoginRequest;
import com.project.core.dto.request.RegisterRequest;
import com.project.core.dto.response.ApiResponse;
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
        var user = userService.getUserByID(userID);
        var map = new HashMap<String, Object>();
        map.put("user", user);
        
        return user == null 
            ? ApiResponse.errorResponse("Utilisateur inexistant", 404)
            : ApiResponse.successResponse("Utilisateur trouvé", map);
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginRequest loginRequest){
        var map = new HashMap<String, Object>();
        var result = userService.login(loginRequest.getEmail(), loginRequest.getPassword());
        switch (result){
            case "Utilisateur inexistant !" -> {
                return ApiResponse.errorResponse(result, 404);
            }
            case "Mot de passe incorrect" -> {
                return ApiResponse.errorResponse(result, 401);
            }
            default -> {
                var user = userService.getUserByEmail(loginRequest.getEmail());
                map.put("userID", user.getId());
                return ApiResponse.successResponse(result, map);
            }
        }
    }

    @PostMapping("/create")
    public ResponseEntity<?> createUser(@RequestBody RegisterRequest userRequest) {
        var map = new HashMap<String, Object>();

        if (userRequest.getEmail().trim().isEmpty())
            return ApiResponse.errorResponse("L'email est vide", 400);

        var existingUser = userService.getUserByEmail(userRequest.getEmail());
        if (existingUser != null)
            return ApiResponse.errorResponse("L'utilisateur existe déjà !", 409);

        if(userRequest.getPassword().isEmpty())
            return ApiResponse.errorResponse("Le mot de passe ne doit pas être vide", 400);

        if(userRequest.getFirstname().isEmpty() || userRequest.getLastname().isEmpty())
            return ApiResponse.errorResponse("Les noms sont manquants", 400);

        var user = User.builder()
            .email(userRequest.getEmail())
            .password(userRequest.getPassword())
            .firstname(userRequest.getFirstname())
            .lastname(userRequest.getLastname())
            .birthdate(userRequest.getBirthdate())
            .build();

        var newUser = userService.createUser(user);
        String generatedToken = jwtService.generateToken(newUser.getId(), newUser.getEmail());
        map.putAll(Map.of("token", generatedToken, "userID", newUser.getId()));
        return ApiResponse.successResponse("Votre compte a été créé", 201, map);
    }

    @PutMapping("/mutate/{user_id}")
    public ResponseEntity<?> updateUser(@PathVariable String user_id, @RequestParam String property, @RequestParam String value){
        User user = userService.getUserByID(user_id);
        if (user == null) return ApiResponse.errorResponse("Utilisateur inexistant", 404);
        switch (property){
            case "email" -> {
                user.setEmail(value);
                userService.saveUser(user);
                return ApiResponse.successResponse("Votre email a été modifié avec succès");
            }
            case "password" -> {
                userService.hashPasswordForUser(user, value);
                return ApiResponse.successResponse("Votre mot de passe a été modifié avec succès");
            }
            case "firstname" -> {
                user.setFirstname(value);
                userService.saveUser(user);
                return ApiResponse.successResponse("Votre prénom a été modifié avec succès");
            }
            case "lastname" -> {
                user.setLastname(value);
                userService.saveUser(user);
                return ApiResponse.successResponse("Votre nom de famille a été modifié avec succès");
            }
            case "birthdate" -> {
                user.setBirthdate(LocalDate.parse(value));
                userService.saveUser(user);
                return ApiResponse.successResponse("Votre date de naissance a été modifié avec succès");
            }
            default -> {
                return ApiResponse.errorResponse("Propriété inconnue...", 400);
            }
        }
    }

    @DeleteMapping("/delete")
    public ResponseEntity<?> deleteUser(@RequestParam String userID){
        User user = userService.getUserByID(userID);

        if(user == null)
            return ApiResponse.errorResponse("Utilisateur inexistant", 404);

        userService.deleteUser(user);
        return ApiResponse.successResponse("Votre compte a été supprimé avec succès");
    }
}