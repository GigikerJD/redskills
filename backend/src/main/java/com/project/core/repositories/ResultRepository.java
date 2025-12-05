package com.project.core.repositories;

import org.springframework.data.mongodb.repository.MongoRepository;

import com.project.core.entities.Result;

public interface ResultRepository extends MongoRepository<Result, String>{
}
