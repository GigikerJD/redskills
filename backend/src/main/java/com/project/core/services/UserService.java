package com.project.core.services;

import java.time.LocalDate;
import java.util.List;

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

    public List<User> getUserWithEmailStartinWith(String prefix){
        return null;
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
            .filter(u -> u.getEmail().equals(user.getEmail()))
            .count() > 0;
    }

    public boolean isUserAlreadyEnlisted(String userID){
        return userRepository.findById(userID).isPresent();
    }

    public String login(String email, String password){
        var user = getUserByEmail(email);
        if (user == null) return "Utilisateur inexistant !";

        var isPasswordCorrect = passwordEncoder.matches(password, user.getPassword());
        return !isPasswordCorrect ? "Mot de passe incorrect" : "Connexion réussie";
    }

    public String register(String email, String password, String firstname, String lastname, LocalDate DOB){
        return "";
    }
}