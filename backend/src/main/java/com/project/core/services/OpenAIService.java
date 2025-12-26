package com.project.core.services;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.node.ObjectNode;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.net.URI;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;
import java.time.Duration;

@Service
public class OpenAIService {
    private final String apiKey;
    private final HttpClient httpClient;
    private final ObjectMapper mapper = new ObjectMapper();

    public OpenAIService(@Value("${openai.api.key:}") String apiKey) {
        this.apiKey = apiKey;
        this.httpClient = HttpClient.newBuilder().connectTimeout(Duration.ofSeconds(10)).build();
    }

    public String createChatCompletion(String prompt) throws IOException, InterruptedException {
        if (apiKey == null || apiKey.isBlank()) {
            throw new IllegalStateException("OPENAI API key not set. Please set OPENAI_API_KEY in your environment or backend/.env");
        }

        ObjectNode body = mapper.createObjectNode();
        body.put("model", "gpt-5.1");
        ObjectNode message = mapper.createObjectNode();
        message.put("role", "user");
        message.put("content", prompt);
        body.putArray("messages").add(message);
        body.put("max_tokens", 500);

        String requestBody = mapper.writeValueAsString(body);

        HttpRequest request = HttpRequest.newBuilder()
                .uri(URI.create("https://api.openai.com/v1/chat/completions"))
                .timeout(Duration.ofSeconds(30))
                .header("Content-Type", "application/json")
                .header("Authorization", "Bearer " + apiKey)
                .POST(HttpRequest.BodyPublishers.ofString(requestBody))
                .build();

        HttpResponse<String> response = httpClient.send(request, HttpResponse.BodyHandlers.ofString());

        if (response.statusCode() >= 300) {
            throw new IllegalStateException("OpenAI API error: " + response.statusCode() + " - " + response.body());
        }

        JsonNode root = mapper.readTree(response.body());
        JsonNode contentNode = root.path("choices").get(0).path("message").path("content");
        return contentNode.asText();
    }
}
