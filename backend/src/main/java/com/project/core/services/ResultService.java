package com.project.core.services;

import java.util.List;

import org.springframework.stereotype.Service;

import com.project.core.entities.Result;
import com.project.core.repositories.ResultRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class ResultService {

    private final ResultRepository resultRepository;

    public List<Result> getResultes(){
        return resultRepository.findAll();
    }

    public Result getResultByID(String resultId){
        return resultRepository.findById(resultId).orElse(null);
    }
    
    public Result createResult(Result result){
        return resultRepository.save(result);
    }

    public void deleteResult(Result result){
        if (result != null)
            resultRepository.delete(result);
    }

    public boolean isResultAlreadyEnlisted(String resultId){
        return resultRepository.findById(resultId).isPresent();
    }
}