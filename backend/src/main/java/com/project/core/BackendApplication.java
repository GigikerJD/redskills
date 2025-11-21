package com.project.core;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

import io.github.cdimascio.dotenv.Dotenv;

@SpringBootApplication
public class BackendApplication {

	public static void main(String[] args) {

		// Charger le fichier .env
        Dotenv dotenv = Dotenv.configure()
            .directory("./")           // Cherche à la racine
            .ignoreIfMissing()         // Ne crash pas si .env absent
            .load();
        
        // Injecter toutes les variables dans les propriétés système
        dotenv.entries().forEach(entry -> {
            System.setProperty(entry.getKey(), entry.getValue());
        });
		
		SpringApplication.run(BackendApplication.class, args);
	}

}
