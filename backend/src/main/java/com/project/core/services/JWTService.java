package com.project.core.services;

import java.time.Instant;
import java.time.temporal.ChronoUnit;
import java.util.Date;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.security.Keys;

@Service
public class JWTService {

    @Value("${JWT_SECRET_KEY}")
    private String secretKey;

    @Value("${JWT_EXPIRATION}")
    private Long expiration;

    public String generateToken(String userID, String email){
        Instant now = Instant.now();

        return Jwts.builder()
            .setSubject(userID)
            .claim("email", email)
            .setIssuedAt(Date.from(now))
            .setExpiration(Date.from(now.plus(expiration, ChronoUnit.MILLIS)))
            .signWith(Keys.hmacShaKeyFor(secretKey.getBytes()), SignatureAlgorithm.HS256)
            .compact();
    }
}