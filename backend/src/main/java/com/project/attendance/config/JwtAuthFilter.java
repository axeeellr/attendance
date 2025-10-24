package com.project.attendance.config;

import com.project.attendance.repo.UserRepository;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.util.StringUtils;
import org.springframework.web.filter.OncePerRequestFilter;


import java.io.IOException;


@Component
public class JwtAuthFilter extends OncePerRequestFilter {
    private final JwtService jwtService;
    private final UserRepository userRepo;
    public JwtAuthFilter(JwtService jwtService, UserRepository userRepo){ this.jwtService=jwtService; this.userRepo=userRepo; }


    @Override
    protected void doFilterInternal(HttpServletRequest req, HttpServletResponse res, FilterChain chain) throws ServletException, IOException {
        String auth = req.getHeader("Authorization");
        if(StringUtils.hasText(auth) && auth.startsWith("Bearer ")){
            String token = auth.substring(7);
            try{
                String email = jwtService.getSubject(token);
                UserDetails user = userRepo.findByEmail(email).orElse(null);
                if(user!=null && SecurityContextHolder.getContext().getAuthentication()==null){
                    var authToken = new UsernamePasswordAuthenticationToken(user, null, user.getAuthorities());
                    authToken.setDetails(new WebAuthenticationDetailsSource().buildDetails(req));
                    SecurityContextHolder.getContext().setAuthentication(authToken);
                }
            }catch(Exception ignored){}
        }
        chain.doFilter(req, res);
    }
}