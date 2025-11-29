package com.project.core.entities;

import java.time.LocalDate;
import java.time.LocalDateTime;

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
@Document(collection="users")
public class User {

    @Id
    private String id;

    @Field(name="firstname")
    private String firstname;

    @Field(name="lastname")
    private String lastname;

    @Field(name="email")
    @Indexed(unique = true)
    @NonNull
    private String email;

    @Field(name="password")
    @NonNull
    private String password;

    @Field(name="birthdate")
    private LocalDate birthdate;

    @Field(name="status")
    private String status;

    @CreatedDate
    @Field(name="created_at")
    private LocalDateTime createdAt;

    @LastModifiedDate
    @Field(name="updated_at")
    private LocalDateTime updatedAt;
}
