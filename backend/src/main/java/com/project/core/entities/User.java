package com.project.core.entities;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.Map;

import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.Id;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.mongodb.core.index.Indexed;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.Field;

import com.mongodb.lang.NonNull;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Document(collection = "users")
public class User {

    @Id
    private String id;

    @Field(name = "firstname")
    private String firstname;

    @Field(name = "lastname")
    private String lastname;

    @Field(name = "email")
    @Indexed(unique = true)
    @NonNull
    private String email;

    @Field(name = "password")
    @NonNull
    private String password;

    @Field(name = "birthdate")
    private LocalDate birthdate;

    @Builder.Default
    @Field(name = "personality_score")
    private Map<String, Double> personalityScore = new HashMap<>(Map.of(
        "D", 0.0,
        "I", 0.0,
        "S", 0.0,
        "C", 0.0
    ));

    @Builder.Default
    @Field(name = "simulated_personnality_stats")
    private Map<String, Double> simulatedPersonnalityStats = new HashMap<>(Map.of(
        "D", 0.0,
        "I", 0.0,
        "S", 0.0,
        "C", 0.0
    ));

    @Builder.Default
    @Field(name = "good_answers_count")
    private Map<String, Integer> goodAnswersCount = new HashMap<>(Map.of(
        "D", 0,
        "I", 0,
        "S", 0,
        "C", 0
    ));

    @CreatedDate
    @Field(name = "created_at")
    private LocalDateTime createdAt;

    @LastModifiedDate
    @Field(name = "updated_at")
    private LocalDateTime updatedAt;
}
