package com.project.core.repositories;

import org.springframework.data.mongodb.repository.MongoRepository;

import com.project.core.entities.Log;

public interface LogRepository extends MongoRepository<Log, String> {

}
