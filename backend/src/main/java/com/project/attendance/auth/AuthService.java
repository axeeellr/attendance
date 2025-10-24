package com.project.attendance.auth;


import com.project.attendance.auth.dto.*;
import com.project.attendance.config.JwtService;
import com.project.attendance.domain.Role;
import com.project.attendance.domain.User;
import com.project.attendance.repo.UserRepository;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;


import java.util.Map;


@Service
public class AuthService {
    private final UserRepository repo; private final PasswordEncoder enc; private final JwtService jwt; private final AuthenticationManager am;
    public AuthService(UserRepository r, PasswordEncoder e, JwtService j, AuthenticationManager am){ this.repo=r; this.enc=e; this.jwt=j; this.am=am; }


    public AuthResponse register(RegisterRequest req){
        if(repo.findByEmail(req.email()).isPresent()) throw new RuntimeException("Email en uso");
        var u = new User(); u.setEmail(req.email()); u.setName(req.name()); u.setPassword(enc.encode(req.password())); u.setRole(Role.DOCENTE);
        repo.save(u);
        var token = jwt.generate(u.getEmail(), Map.of("name", u.getName(), "role", u.getRole().name()));
        return new AuthResponse(token, u.getEmail(), u.getName());
    }


    public AuthResponse login(LoginRequest req){
        am.authenticate(new UsernamePasswordAuthenticationToken(req.email(), req.password()));
        var u = repo.findByEmail(req.email()).orElseThrow();
        var token = jwt.generate(u.getEmail(), Map.of("name", u.getName(), "role", u.getRole().name()));
        return new AuthResponse(token, u.getEmail(), u.getName());
    }
}