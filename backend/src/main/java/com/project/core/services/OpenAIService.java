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
        this.httpClient = HttpClient.newBuilder()
                .connectTimeout(Duration.ofSeconds(10))
                .build();
    }

    // Uses OpenAI Responses API to create a chat completion
    // param: prompt - String - the user's input prompt
    // returns: String - the AI's response text
    // throws: IOException, InterruptedException
    public String createChatCompletion(String prompt) throws IOException, InterruptedException {
        requireApiKey();

        String requestBody = buildResponsesRequest(prompt);

        HttpRequest request = HttpRequest.newBuilder()
                .uri(URI.create("https://api.openai.com/v1/responses"))
                .timeout(Duration.ofSeconds(30))
                .header("Content-Type", "application/json")
                .header("Authorization", "Bearer " + apiKey)
                .POST(HttpRequest.BodyPublishers.ofString(requestBody))
                .build();

        HttpResponse<String> response = httpClient.send(request, HttpResponse.BodyHandlers.ofString());
        String rawBody = response.body();

        // If OpenAI returns a non-2xx, it's an OpenAI error
        if (response.statusCode() / 100 != 2) {
            throw new IllegalStateException("OpenAI API error: " + response.statusCode() + " - " + rawBody);
        }

        JsonNode root = mapper.readTree(rawBody);

        // Handle case of a success HTTP but error in payload (rare, but safe)
        JsonNode err = root.get("error");
        if (err != null && !err.isNull()) {
            String msg = err.path("message").asText("Unknown OpenAI error");
            throw new IllegalStateException("OpenAI error in payload: " + msg);
        }

        // Extract the response text
        String text = extractResponsesText(root);
        if (text.isBlank()) {
            throw new IllegalStateException("Could not extract text from OpenAI response: " + rawBody);
        }

        return text;
    }

    // Ensures the API key is set
    // throws: IllegalStateException
    private void requireApiKey() {
        if (apiKey == null || apiKey.isBlank()) {
            throw new IllegalStateException("OPENAI API key not set. Please set OPENAI_API_KEY in your environment or backend/.env");
        }
    }

    // Builds the request body for the Responses API
    // param: prompt - String - the user's input prompt
    // returns: String - JSON request body
    // throws: IOException
    private String buildResponsesRequest(String prompt) throws IOException {
        ObjectNode body = mapper.createObjectNode();
        body.put("model", "gpt-4.1"); // We could use other models here

        ObjectNode message = mapper.createObjectNode();
        message.put("role", "user");
        message.put("content", prompt);

        body.putArray("input").add(message);

        body.put("max_output_tokens", 150); // Limit response length, it can be adjusted

        return mapper.writeValueAsString(body);
    }

    // Extracts the response text from the Responses API payload
    // param: root - JsonNode - the root of the JSON response
    // returns: String - the extracted response text
    private String extractResponsesText(JsonNode root) {
        // 1) Preferred: output_text
        String preferredText = extractPreferredOutputText(root);
        if (!preferredText.isEmpty())
            return preferredText;
        

        // 2) Fallback: output[].content[] where type == "output_text"
        return extractFallbackOutputText(root);
    }

    // Extracts output_text field from root
    // param: root - JsonNode - the root of the JSON response
    // returns: String - the extracted text or empty string
    private String extractPreferredOutputText(JsonNode root) {
        JsonNode outputText = root.get("output_text");
        if (outputText != null && !outputText.isNull())
            return outputText.asText("").trim();

        return "";
    }

    // Extracts text from output array with content type "output_text"
    // param: root - JsonNode - the root of the JSON response
    // returns: String - the extracted text or empty string
    private String extractFallbackOutputText(JsonNode root) {
        JsonNode output = root.get("output");
        if (output == null || !output.isArray())
            return "";

        StringBuilder stringBuilder = new StringBuilder();
        for (JsonNode item : output) {
            JsonNode content = item.get("content");
            if (content != null && content.isArray()) {
                for (JsonNode c : content) {
                    if ("output_text".equals(c.path("type").asText())) {
                        stringBuilder.append(c.path("text").asText(""));
                    }
                }
            }
        }
        return stringBuilder.toString().trim();
    }
}