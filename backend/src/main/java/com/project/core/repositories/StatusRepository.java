package com.project.core.repositories;

import org.springframework.data.mongodb.repository.MongoRepository;

import com.project.core.entities.Status;

public interface StatusRepository extends MongoRepository<Status, String> {

}
