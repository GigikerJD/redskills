package com.project.core.entities;

import java.time.LocalDateTime;

import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.Id;
import org.springframework.data.annotation.LastModifiedDate;
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
@Document(collection="result")
public class Result {

    @Id
    private String id;

    @Field(name="user_id")
    @NonNull
    private String userId;

    @Field(name="date_result")
    @NonNull
    private LocalDateTime dateResult;

    @Field(name="profil_disc")
    private String profilDisc;

    @Field(name="profil_personality")
    private String profilPersonality;

    @CreatedDate
    @Field(name="created_at")
    private LocalDateTime createdAt;

    @LastModifiedDate
    @Field(name="updated_at")
    private LocalDateTime updatedAt;
}
