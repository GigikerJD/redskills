package com.project.core.entities;

import java.time.Duration;
import java.time.LocalDateTime;

import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.Field;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Document(collection = "logs")
public class Log {

    @Id
    private String id;

    @CreatedDate
    @Field(name = "created_at")
    private LocalDateTime createdAt;

    @Field(name = "method")
    private String method;

    @Field(name = "endpoint")
    private String endpoint;

    @Field(name = "userId")
    private String userId;

    @Field(name = "statusCode")
    private int statusCode;

    @Field(name = "buildTime")
    private Duration buildTime;
}
