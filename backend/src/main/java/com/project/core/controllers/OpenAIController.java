package com.project.core.controllers;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.project.core.services.OpenAIService;

@RestController
@RequestMapping("/api/openai")
public class OpenAIController {
    private final OpenAIService openAIService;
    public OpenAIController(OpenAIService openAIService){ this.openAIService = openAIService; }

    @GetMapping("/ask")
    public String ask(@RequestParam String prompt) throws Exception {
        return openAIService.createChatCompletion(prompt);
    }
}
