package com.project.core.services;

import org.springframework.stereotype.Service;

import com.project.core.entities.Result;
import com.project.core.repositories.ResultRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class ResultService {

    private final ResultRepository resultRepository;

    public Result findProfileForUser(String userID){
        var userResult = resultRepository
            .findAll()
            .stream()
            .filter(r -> r.getUserID().equals(userID))
            .findFirst();
        return userResult.orElse(null);
    }

    public void saveResultForUser(String userID, Result result){
        var existingResult = findProfileForUser(userID);
        
        if (existingResult != null) {
            existingResult.setProfileDisc(result.getProfileDisc());
            existingResult.setProfilePersonality(result.getProfilePersonality());
            existingResult.setResultDate(result.getResultDate());
            resultRepository.save(existingResult);
        } else {
            result.setUserID(userID);
            resultRepository.save(result);
        }
    }

}
