package com.project.core.dto.response;

import java.util.HashMap;
import java.util.Map;

import org.springframework.http.ResponseEntity;

public class ApiResponse {

    public static ResponseEntity<HashMap<String, Object>> errorResponse(
        String message, 
        int status, 
        HashMap<String, Object> map){
        var resultMap = new HashMap<String, Object>();
        resultMap.putAll(Map.of("type", "error", "message", message));
        resultMap.putAll(map);
        return ResponseEntity.status(status).body(resultMap);
    }

    public static ResponseEntity<HashMap<String, Object>> errorResponse(String message, int status){
        var resultMap = new HashMap<String, Object>();
        resultMap.putAll(Map.of("type", "error", "message", message));
        return ResponseEntity.status(status).body(resultMap);
    }
    

    public static ResponseEntity<HashMap<String, Object>> successResponse(
        String message, 
        HashMap<String, Object> map){
        var resultMap = new HashMap<String, Object>();
        resultMap.putAll(Map.of("type", "success", "message", message));
        resultMap.putAll(map);
        return ResponseEntity.status(200).body(resultMap);
    }

    public static ResponseEntity<HashMap<String, Object>> successResponse(
        String message,
        int status, 
        HashMap<String, Object> map){
        var resultMap = new HashMap<String, Object>();
        resultMap.putAll(Map.of("type", "success", "message", message));
        resultMap.putAll(map);
        return ResponseEntity.status(status).body(resultMap);
    }

    public static ResponseEntity<HashMap<String, Object>> successResponse(String message){
        var resultMap = new HashMap<String, Object>();
        resultMap.putAll(Map.of("type", "success", "message", message));
        return ResponseEntity.status(200).body(resultMap);
    }
}
