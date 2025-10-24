package com.project.attendance.util;

import com.project.attendance.repo.UserRepository;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;

@Configuration
public class DataLoader {
    @Bean UserDetailsService uds(UserRepository repo){
        return username -> repo.findByEmail(username).orElseThrow(()-> new UsernameNotFoundException("No existe usuario"));
    }
}
