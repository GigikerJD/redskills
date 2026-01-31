package com.project.core.dto.request;

import java.time.LocalDate;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ResultRequest {
    private LocalDate resultDate;
    private String profileDisc;
    private String profilePersonality;
    private String userID;
}
