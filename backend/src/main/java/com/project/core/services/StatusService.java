package com.project.core.services;

import java.util.List;

import org.springframework.stereotype.Service;

import com.project.core.entities.Status;
import com.project.core.repositories.StatusRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class StatusService {

    private final StatusRepository statusRepository;

    public List<Status> getStatuses(){
        return statusRepository.findAll();
    }

    public Status getStatusByID(String statusId){
        return statusRepository.findById(statusId).orElse(null);
    }

    public Status getStatusByName(String statusName){
        return statusRepository.findAll().stream()
            .filter(s -> s.getNameStatus().equals(statusName))
            .findFirst()
            .orElse(null);
    }
    
    public Status createStatus(Status status){
        return statusRepository.save(status);
    }

    public void deleteStatus(Status status){
        if (status != null)
            statusRepository.delete(status);
    }

    public boolean isStatusAlreadyCreated(String statusId){
        return statusRepository.findById(statusId).isPresent();
    }

    public boolean isStatusAlreadyCreatedByName(String statusName){
        return getStatusByName(statusName) != null;
    }
}