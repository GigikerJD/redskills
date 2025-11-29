package com.project.core.services;

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
}