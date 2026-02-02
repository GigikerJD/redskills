package com.project.core.config;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

@Configuration
public class CorsConfig {

    @Value("${FRONTEND_URL:}")
    private String frontendURL;

    private static final Logger logger = LoggerFactory.getLogger(CorsConfig.class);

    @Bean
    public WebMvcConfigurer corsConfigurer() {
        return new WebMvcConfigurer() {
            @Override
            public void addCorsMappings(CorsRegistry registry) {
                // If FRONTEND_URL is not set, use common local dev origins as fallbacks.
                String[] allowedPatterns;
                if (frontendURL == null || frontendURL.isBlank()) {
                    allowedPatterns = new String[]{
                            "http://localhost:5173",
                    };
                    logger.warn("FRONTEND_URL not set — using fallback allowed origins: {}", (Object) allowedPatterns);
                } else {
                    allowedPatterns = new String[]{frontendURL};
                    logger.info("CORS allowed origin: {}", frontendURL);
                }

                // Use allowedOriginPatterns to be more flexible with localhost dev hosts
                registry.addMapping("/**")
                        .allowedOriginPatterns(allowedPatterns)
                        .allowedMethods("GET", "POST", "PUT", "DELETE", "OPTIONS", "HEAD")
                        .allowedHeaders("*")
                        .allowCredentials(true);
            }
        };
    }
}
