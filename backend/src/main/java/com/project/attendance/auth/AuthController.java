package com.project.attendance.auth;


import com.project.attendance.auth.dto.*;
import com.project.attendance.repo.UserRepository;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import com.project.attendance.domain.User;


@RestController @RequestMapping("/api/auth")
public class AuthController {
    private final AuthService svc;
    public AuthController(AuthService s){ this.svc=s; }

    @GetMapping("/me")
    public ResponseEntity<AuthResponse> me(@AuthenticationPrincipal User user){
        return ResponseEntity.ok(new AuthResponse("", user.getEmail(), user.getName()));
    }

    @PostMapping("/register")
    public ResponseEntity<AuthResponse> register(@Valid @RequestBody RegisterRequest req){ return ResponseEntity.ok(svc.register(req)); }

    @PostMapping("/login")
    public ResponseEntity<AuthResponse> login(@Valid @RequestBody LoginRequest req){ return ResponseEntity.ok(svc.login(req)); }
}