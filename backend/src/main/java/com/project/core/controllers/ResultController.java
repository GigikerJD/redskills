package com.project.core.controllers;

import java.util.HashMap;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.project.core.dto.response.ApiResponse;
import com.project.core.services.ResultService;


@RestController
@RequestMapping("/results")
public class ResultController {

    @Autowired
    private ResultService resultService;

    @GetMapping("/{userID}")
    public ResponseEntity<?> getProfile(@PathVariable String userID) {
        var result = resultService.findProfileForUser(userID);
        var map = new HashMap<String, Object>();
        map.put("result", result);

        return result == null
            ? ApiResponse.errorResponse("Profile DISC non complétée ou introuvable", 404)
            : ApiResponse.successResponse("Profile DISC trouvé", map);
    }
    
}
