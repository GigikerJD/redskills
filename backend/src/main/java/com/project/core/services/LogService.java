package com.project.core.services;

import java.time.Duration;
import java.time.LocalDateTime;

import org.springframework.stereotype.Service;

import com.project.core.entities.Log;
import com.project.core.repositories.LogRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class LogService {

    private final LogRepository logRepository;

    // Create a log with minimal information
    public Log createLog(String method, String endpoint){
        Log log = Log.builder()
            .method(method)
            .endpoint(endpoint)
            .createdAt(LocalDateTime.now())
            .build();
        if (log == null)
            throw new IllegalStateException("Log object is null");
        return logRepository.save(log);
    }

    // Create a log with full information.
    // Includes userId, statusCode, and buildTime
    public Log createLog(String method, String endpoint, String userId, int statusCode, Duration buildTime){
        Log log = Log.builder()
            .method(method)
            .endpoint(endpoint)
            .userId(userId)
            .statusCode(statusCode)
            .buildTime(buildTime)
            .createdAt(LocalDateTime.now())
            .build();
        if (log == null)
            throw new IllegalStateException("Log object is null");
        return logRepository.save(log);
    }
    
    // Note: Additional log-related methods can be added here as needed
    // Only createLog is implemented as it is the primary operation for logs
}