package com.project.core.services;

import java.util.List;

import org.springframework.stereotype.Service;

import com.project.core.entities.User;
import com.project.core.repositories.UserRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class UserService {

    private final UserRepository userRepository;

    public List<User> getUsers(){
        return userRepository.findAll();
    }

    public void createUser(User user){
        userRepository.save(user);
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

}
