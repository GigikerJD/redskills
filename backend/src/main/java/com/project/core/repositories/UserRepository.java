package com.project.core.repositories;

import java.util.Optional;

import org.springframework.data.mongodb.repository.MongoRepository;

import com.project.core.entities.User;

public interface UserRepository extends MongoRepository<User, String>{
    Optional<User> findByEmail(String email);
}
