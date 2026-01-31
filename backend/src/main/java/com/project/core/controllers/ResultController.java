package com.project.core.controllers;

import java.util.HashMap;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.project.core.dto.response.ApiResponse;
import com.project.core.entities.Result;
import com.project.core.services.ResultService;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

import com.project.core.dto.request.ResultRequest;
import com.project.core.services.UserService;



@RestController
@RequestMapping("/results")
public class ResultController {

    @Autowired
    private ResultService resultService;

    @Autowired
    private UserService userService;

    @GetMapping("/{userID}")
    public ResponseEntity<?> getProfile(@PathVariable String userID) {
        var result = resultService.findProfileForUser(userID);
        var map = new HashMap<String, Object>();
        map.put("result", result);

        return result == null
            ? ApiResponse.errorResponse("Profile DISC non complétée ou introuvable", 404)
            : ApiResponse.successResponse("Profile DISC trouvé", map);
    }

    @PostMapping("/{userID}")
    public ResponseEntity<?> saveUserProfile(@PathVariable String userID, @RequestBody ResultRequest resultRequest){
        var user = userService.getUserByID(userID);
        
        if (user == null) 
            return ApiResponse.errorResponse("Utilisateur inconnu !", 404);

        if (resultRequest == null) 
            return ApiResponse.errorResponse("Le résultat du questionnaire doit être rempli !", 400);

        var resultToSave = Result.builder()
            .profileDisc(resultRequest.getProfileDisc())
            .profilePersonality(resultRequest.getProfilePersonality())
            .resultDate(resultRequest.getResultDate())
            .build();
        resultService.saveResultForUser(userID, resultToSave);

        return ApiResponse.successResponse("Questionnaire complété avec succès");
    }
    
}
