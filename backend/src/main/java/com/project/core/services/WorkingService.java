package com.project.core.services;

import java.util.List;

import org.springframework.stereotype.Service;

import com.project.core.entities.Working;
import com.project.core.repositories.WorkingRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class WorkingService {

    private final WorkingRepository workingRepository;

    public List<Working> getWork(){
        return workingRepository.findAll();
    }

    public Working getWorkByID(String workId){
        return workingRepository.findById(workId).orElse(null);
    }
    
    public List<Working> getWorkByUser(String userId){
        return workingRepository.findAll().stream()
            .filter(w -> w.getUserId().equals(userId))
            .toList();
    }

    public List<Working> getWorkByStatus(String statusId){
        return workingRepository.findAll().stream()
            .filter(w -> w.getStatusId().equals(statusId))
            .toList();
    }

    public Working createStatus(Working work){
        return workingRepository.save(work);
    }

    public void deleteWork(Working work){
        if (work != null)
            workingRepository.delete(work);
    }

    public boolean isWorkingAlreadyEnlisted(String workingId){
        return workingRepository.findById(workingId).isPresent();
    }
}