package com.project.attendance.config;

import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;


import java.security.Key;
import java.util.Date;
import java.util.Map;


@Service
public class JwtService {
    @Value("${jwt.secret}")
    private String secret;
    @Value("${jwt.expiration-ms}")
    private long expirationMs;


    private Key key(){ return Keys.hmacShaKeyFor(Decoders.BASE64.decode(java.util.Base64.getEncoder().encodeToString(secret.getBytes()))); }


    public String generate(String subject, Map<String, Object> claims){
        return Jwts.builder()
                .setClaims(claims)
                .setSubject(subject)
                .setIssuedAt(new Date())
                .setExpiration(new Date(System.currentTimeMillis()+expirationMs))
                .signWith(key(), SignatureAlgorithm.HS256)
                .compact();
    }


    public String getSubject(String token){
        return Jwts.parserBuilder().setSigningKey(key()).build().parseClaimsJws(token).getBody().getSubject();
    }
}