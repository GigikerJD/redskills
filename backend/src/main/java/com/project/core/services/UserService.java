package com.project.core.services;

import java.time.LocalDate;
import java.util.List;
import java.util.Map;
import java.util.Optional;

import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.project.core.entities.User;
import com.project.core.repositories.UserRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class UserService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    public List<User> getUsers(){
        return userRepository.findAll();
    }

    public User getUserByID(String id){
        return userRepository.findById(id).orElse(null);
    }
    
    public User getUserByEmail(String email){
        return userRepository.findByEmail(email).orElse(null);
    }

    public User createUser(User user){
        String hashPassword = passwordEncoder.encode(user.getPassword());
        user.setPassword(hashPassword);
        return userRepository.save(user);
    }

    public User saveUser(User user){
        return userRepository.save(user);
    }

    public void hashPasswordForUser(User user, String rawPassword){
        var hashPassword = passwordEncoder.encode(rawPassword);
        user.setPassword(hashPassword);
        userRepository.save(user);
    }

    public void deleteUser(User user){
        userRepository.delete(user);
    }

    public boolean isUserAlreadyEnlisted(User user){
        return userRepository
            .findAll()
            .stream()
            .anyMatch(u -> u.getEmail().equals(user.getEmail()));
    }

    public boolean isUserAlreadyEnlisted(String userID){
        return userRepository.findById(userID).isPresent();
    }

    public String login(String email, String password){
        var user = getUserByEmail(email);
        Map<Boolean, String> strategies = Map.of(
            true, "Connexion réussie", 
            false, "Mot de passe incorrect"
        );
        return Optional.ofNullable(user)
            .map(u -> strategies.get(passwordEncoder.matches(password, u.getPassword())))
            .orElse("Utilisateur inexistant !");
    }

    public String mutateUserProperty(User user, String property, String value){
        List<String> properties = List.of("email", "firstname", "lastname", "password", "birthdate");
        switch (property) {
            case "email" -> {
                user.setEmail(value);
                saveUser(user);
                return "Votre email a été modifiée avec succès";
            }
            case "firstname" -> {
                user.setFirstname(value);
                saveUser(user);
                return "Votre mot de passe a été modifiée avec succès";
            }
            case "lastname" -> {
                user.setLastname(value);
                saveUser(user);
                return "Votre prénom a été modifiée avec succès";
            }
            case "birthdate" -> {
                user.setBirthdate(LocalDate.parse(value));
                saveUser(user);
                return "Votre date de naissance a été modifiée avec succès";
            }
            default -> {
                return "Propriété inconnue";
            }
        }
    }
}