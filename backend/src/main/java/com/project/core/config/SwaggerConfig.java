package com.project.core.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import io.swagger.v3.oas.models.OpenAPI;
import io.swagger.v3.oas.models.info.Info;

@Configuration
public class SwaggerConfig {

    @Bean
    public OpenAPI customOpenAPI(){
        return new OpenAPI()
            .info(new Info()
                .title("Projet - RedSkill")
                .version("1.0.0")
                .description("Plateforme web d'apprentissage de soft-skills automatisée par l'IA pour aider étudiants & professionnels")        
        );
    }
}
