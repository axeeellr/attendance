package com.project.attendance.config;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import java.util.List;

@Configuration
@EnableMethodSecurity
public class SecurityConfig {
    private final JwtAuthFilter jwtAuthFilter;
    private final UserDetailsService uds;
    public SecurityConfig(JwtAuthFilter jwtAuthFilter, UserDetailsService uds){ this.jwtAuthFilter=jwtAuthFilter; this.uds=uds; }

    @Value("${app.cors.origins}")
    private String corsOrigin;


    @Bean
    SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        http
                .csrf(csrf->csrf.disable())
                .cors(c-> c.configurationSource(corsSource()))
                .sessionManagement(sm-> sm.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
                .authorizeHttpRequests(reg-> reg
                        .requestMatchers("/api/auth/**").permitAll()
                        .requestMatchers(HttpMethod.GET, "/api/observations/catalog").hasAnyRole("DOCENTE","ADMIN")
                        .anyRequest().authenticated()
                )
                .authenticationProvider(authProvider())
                .addFilterBefore(jwtAuthFilter, UsernamePasswordAuthenticationFilter.class);
        return http.build();
    }


    @Bean PasswordEncoder passwordEncoder(){ return new BCryptPasswordEncoder(); }


    @Bean AuthenticationProvider authProvider(){
        var p = new DaoAuthenticationProvider();
        p.setPasswordEncoder(passwordEncoder());
        p.setUserDetailsService(uds);
        return p;
    }


    @Bean AuthenticationManager authenticationManager(AuthenticationConfiguration cfg) throws Exception {
        return cfg.getAuthenticationManager();
    }


    @Bean CorsConfigurationSource corsSource(){
        var cfg = new CorsConfiguration();
        cfg.setAllowedOrigins(List.of(corsOrigin));
        cfg.setAllowedMethods(List.of("GET","POST","PUT","DELETE","OPTIONS"));
        cfg.setAllowedHeaders(List.of("*"));
        var src = new UrlBasedCorsConfigurationSource();
        src.registerCorsConfiguration("/**", cfg);
        return src;
    }
}