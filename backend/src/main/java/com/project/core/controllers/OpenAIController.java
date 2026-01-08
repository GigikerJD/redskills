package com.project.core.controllers;

import java.io.IOException;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.project.core.exceptions.OpenAIException;
import com.project.core.services.OpenAIService;

@RestController
@RequestMapping("/api/openai")
public class OpenAIController {
    private final OpenAIService openAIService;
    public OpenAIController(OpenAIService openAIService){ this.openAIService = openAIService; }

    @GetMapping("/ask")
    public String ask(@RequestParam String prompt) {
        try {
            return openAIService.createChatCompletion(prompt);
        } catch (InterruptedException ie) {
            Thread.currentThread().interrupt();
            throw new OpenAIException("OpenAI request was interrupted", ie);
        } catch (IOException ioe) {
            throw new OpenAIException("I/O error while contacting OpenAI", ioe);
        } catch (IllegalStateException ise) {
            throw new OpenAIException("OpenAI service error: " + ise.getMessage(), ise);
        }
    }
}
