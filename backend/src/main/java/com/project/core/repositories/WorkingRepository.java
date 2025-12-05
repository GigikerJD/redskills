package com.project.core.repositories;

import org.springframework.data.mongodb.repository.MongoRepository;

import com.project.core.entities.Working;

public interface WorkingRepository extends MongoRepository<Working, String> {

}
